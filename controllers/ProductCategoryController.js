const db = require('../config/database.js');

const ProductCategoryController = {
  createTableProductCategory(req, res) {
    let sql =
      'CREATE TABLE product_category(id INT AUTO_INCREMENT,products_id INT,categories_id INT,PRIMARY KEY(id),FOREIGN KEY(products_id) REFERENCES products(id) ON DELETE CASCADE,FOREIGN KEY(categories_id) REFERENCES categories(id))';
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Product_category table created...');
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
};
module.exports = ProductCategoryController;
