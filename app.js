// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/productos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
