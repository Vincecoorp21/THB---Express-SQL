const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.get('/createdb', ProductController.create);
router.get('/createtable/products', ProductController.createTableProducts);
router.post('/addproduct', ProductController.addProduct);
router.post('/addProductCategory', ProductController.addProductCategory);
router.put('/updateProduct/:id', ProductController.updateProduct);
router.get('/products', ProductController.showProducts);
router.get('/showproductCategory', ProductController.showProductCategory);
router.get('/products/:id', ProductController.showProductsId);
router.get('/productsdesc', ProductController.descProducts);
router.get('/products_search/:product_name', ProductController.showProductName);
router.delete('/productdelete/:id', ProductController.deleteProductId);

module.exports = router;
