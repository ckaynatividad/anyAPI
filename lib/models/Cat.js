const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.type = row.type;
  }

  getHello() {
    return `Meow I'm ${this.name} and I am ${this.age} years old`;
  }

  static async insert({ name, age, type }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        cats (name, age, type)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [name, age, type]
    );
    return new Cat(rows[0]);
  }

  static async findALL() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
        cats
      `
    );
    return rows.map((row) => new Cat(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        cats
      WHERE
        id=$1
      `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentCat = await Cat.findById(id);
    const updatedAttributes = { ...currentCat, ...attributes };
    const { name, age, type } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        cats
      SET
        name=$1,
        age=$2,
        type=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [name, age, type, id]
    );
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        cats
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Cat(rows[0]);
  }
};
