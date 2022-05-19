const express = require('express');
const ProductCategoryController = require('../controllers/ProductCategoryController');
const router = express.Router();

router.get(
  '/createtable/product_category',
  ProductCategoryController.createTableProductCategory
);
router.post(
  '/addProductCategory',
  ProductCategoryController.addProductCategory
);

module.exports = router;
