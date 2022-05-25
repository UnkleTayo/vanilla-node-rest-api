const Product = require('../models/productModel');
const { getDataFromBody } = require('../utils');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Get single Product
 * @route GET api/product/:id
 */

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Create a  Product
 * @route POST api/product/:id
 */

async function createProduct(req, res) {
  try {
    const body = await getDataFromBody(req);
    console.log(body);
    const { title, description, price } = body;

    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Update a   Product
 * @route PUT api/product/:id
 */

async function updateProduct(req, res, id) {
  try {
    // check if product exist
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
      return;
    }
    const body = await getDataFromBody(req);
    const { title, description, price } = body;

    const productData = {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };
    const updatedProduct = await Product.update(productData, id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Delete single Product
 * @route DELETE api/product/:id
 */

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
      return;
    }
    await Product.remove(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Product  ${id} removed` }));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
