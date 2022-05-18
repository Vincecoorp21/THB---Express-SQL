const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 4000;
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'expressDBsecond',
});

db.connect();

/*****CREAMOS LA BASE DE DATOS***/
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE expressDBsecond';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});

//CREANDO LAS TABLAS*****************************/
//TABLA PRODUCTOS*********************************/

app.get('/createtable/products', (req, res) => {
  let sql =
    'CREATE TABLE products(id int AUTO_INCREMENT,product_name VARCHAR(255), price FLOAT, PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Products table created...');
  });
});

/******TABLA CATEGORIES*********************************/
app.get('/createtable/categories', (req, res) => {
  let sql =
    'CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(255), category_desc VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Categories table created...');
  });
});

/*******TABLA PRODUCT_CATEGORY************/
app.get('/createtable/product_category', (req, res) => {
  let sql =
    'CREATE TABLE product_category(id INT AUTO_INCREMENT,products_id INT,categories_id INT,PRIMARY KEY(id),FOREIGN KEY(products_id) REFERENCES products(id) ON DELETE CASCADE,FOREIGN KEY(categories_id) REFERENCES categories(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Product_category table created...');
  });
});
/**********AÑADIR UN PRODUCTO***************/
app.post('/addproduct', (req, res) => {
  let sql = `INSERT INTO products (product_name, price) values ('${req.body.product_name}', '${req.body.price}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Product added....');
  });
});
/**********AÑADIR UNA CATEGORÍA***************/
app.post('/addcategory', (req, res) => {
  let sql = `INSERT INTO categories (category_name, category_desc) values ('${req.body.category_name}','${req.body.category_desc}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Category added....');
  });
});

/**********************AÑADIR PRODUCT-CATEGORY******/
app.post('/addProductCategory', (req, res) => {
  let sql = `INSERT INTO product_category (products_id, categories_id) values ('${req.body.products_id}','${req.body.categories_id}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Product Category added...');
  });
});
/***********ACTUALIZAR UN PRODUCTO*******/
app.put('/updateProduct/:id', (req, res) => {
  const newProduct = {
    product_name: req.body.product_name,
    price: req.body.price,
  };
  let sql = `UPDATE products SET product_name = '${newProduct.product_name}', price = '${newProduct.price}' WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product updated...');
  });
});

/***********ACTUALIZAR UNA CATEGORIA*******/
app.put('/updateCategory/:id', (req, res) => {
  const newCategory = {
    category_name: req.body.category_name,
    category_desc: req.body.category_desc,
  };
  let sql = `UPDATE categories SET category_name = '${newCategory.category_name}', category_desc = '${newCategory.category_desc}' WHERE id ='${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Category updated....');
  });
});

/*******MUESTRA TODOS LOS PRODUCTOS************************/
app.get('/products', (req, res) => {
  let sql = `SELECT * FROM products`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/*******MUESTRA TODOS LAS CATEGORIAS************************/
app.get('/categories', (req, res) => {
  let sql = `SELECT * FROM categories`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/*******MUESTRA TODOS LOS PRODUCTOS CON CATEGORÍAS************************/
app.get('/showproductCategory', (req, res) => {
  let sql = `SELECT product_name, category_name FROM products INNER JOIN categories ON products.id = categories.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
/*********++*MUESTRA UN PRODUCTO POR ID*******/
app.get('/products/:id', (req, res) => {
  let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/********MUESTRE LOS PRODUCTOS DESC**********************/
app.get('/productsdesc', (req, res) => {
  let sql = `SELECT * FROM products ORDER BY product_name DESC `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/*******SELECT CATEGORY POR ID++++*****/
app.get('/categories/:id', (req, res) => {
  let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/*********BUSCAR PRODUCTO POR NOMBRE*******/
app.get('/products_search/:product_name', (req, res) => {
  let sql = `SELECT * FROM products WHERE product_name = '${req.params.product_name}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/***********ELIMINAR PRODUCTO POR ID*****************/
app.delete('/productdelete/:id', (req, res) => {
  let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product has been deleted...');
  });
});

/****************************************************/
app.listen(port, () => console.log(`servidor levantado en el puerto ${port}`));
