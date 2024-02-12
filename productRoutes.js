const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).limit(req.query.limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newProduct = new Product({
      description: req.body.description,
      cade: req.body.cade,
      price: req.body.price,
      status: true,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:pid', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
