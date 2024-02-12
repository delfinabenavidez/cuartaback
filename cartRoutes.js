const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');


router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({
      products: []
    });
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
    if (productIndex === -1) {
      cart.products.push({ product: req.params.pid, quantity: req.body.quantity });
    } else {
      cart.products[productIndex].quantity += req.body.quantity;
    }
    await cart.save();
    res.json(cart.products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
