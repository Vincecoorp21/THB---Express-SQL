const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get(
  '/createtable/product_category',
  CategoryController.createTableCategories
);
router.post('/addcategory', CategoryController.addCategory);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.get('/categories', CategoryController.showCategories);
router.get('/categories/:id', CategoryController.showCategoriesId);

module.exports = router;
