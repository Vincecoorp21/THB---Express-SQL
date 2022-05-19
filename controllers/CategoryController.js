const db = require('../config/database.js');

const CategoryController = {
  createTableCategories(req, res) {
    let sql =
      'CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(255), category_desc VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Categories table created...');
    });
  },
  addCategory(req, res) {
    let sql = `INSERT INTO categories (category_name, category_desc) values ('${req.body.category_name}','${req.body.category_desc}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Category added....');
    });
  },
  updateCategory(req, res) {
    const newCategory = {
      category_name: req.body.category_name,
      category_desc: req.body.category_desc,
    };
    let sql = `UPDATE categories SET category_name = '${newCategory.category_name}', category_desc = '${newCategory.category_desc}' WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send('Category updated....');
    });
  },
  showCategories(req, res) {
    let sql = `SELECT * FROM categories`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  showCategoriesId(req, res) {
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

module.exports = CategoryController;
