const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  // for api/v1/cats
  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    res.send(cat);
  })

  .get('/', async (req, res) => {
    const cats = await Cat.findALL();
    res.send(cats);
  })
  // api/v1/cats/:id
  .get('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.findById(req.params.id);
      res.send(cat);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const cat = await Cat.updateById(req.params.id, req.body);
    res.send(cat);
  })

  .delete('/:id', async (req, res) => {
    const cat = await Cat.deleteById(req.params.id);
    res.send(cat);
  });
