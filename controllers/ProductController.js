const db = require('../config/database.js');

const ProductController = {
  create(req, res) {
    let sql = 'CREATE DATABASE expressDBsecond';
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Database created...');
    });
  },
  createTableProducts(req, res) {
    let sql =
      'CREATE TABLE products(id int AUTO_INCREMENT,product_name VARCHAR(255), price FLOAT, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Products table created...');
    });
  },
  addProduct(req, res) {
    let sql = `INSERT INTO products (product_name, price) values ('${req.body.product_name}', '${req.body.price}');`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Product added....');
    });
  },
  addProductCategory(req, res) {
    let sql = `INSERT INTO product_category (products_id, categories_id) values ('${req.body.products_id}','${req.body.categories_id}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Product Category added...');
    });
  },
  updateProduct(req, res) {
    const newProduct = {
      product_name: req.body.product_name,
      price: req.body.price,
    };
    let sql = `UPDATE products SET product_name = '${newProduct.product_name}', price = '${newProduct.price}' WHERE id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send('Product updated...');
    });
  },
  showProducts(req, res) {
    let sql = `SELECT * FROM products`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  showProductCategory(req, res) {
    let sql = `SELECT product_name, category_name FROM products INNER JOIN categories ON products.id = categories.id`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  },
  showProductsId(req, res) {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  descProducts(req, res) {
    let sql = `SELECT * FROM products ORDER BY product_name DESC `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  showProductName(req, res) {
    let sql = `SELECT * FROM products WHERE product_name = '${req.params.product_name}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  deleteProductId(req, res) {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send('Product has been deleted...');
    });
  },
};
module.exports = ProductController;
