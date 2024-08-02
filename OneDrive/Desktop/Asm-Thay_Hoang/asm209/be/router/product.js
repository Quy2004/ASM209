import express from 'express';

import { checkValidateProduct } from '../middleware/product.js';
// import { addProductWithImages, deleteProduct, getById, getProduct, putProduct, uploadProductImages } from '../controller/product.js';
import { addProduct, deleteProduct, getById, getProduct, putProduct } from '../controller/product.js';

const router = express.Router();

// router.post('/products', uploadProductImages, checkValidateProduct, addProductWithImages);
router.post('/products', addProduct);
router.get('/products', getProduct);
router.get('/products/:id', getById);
// router.put('/products/:id', uploadProductImages, checkValidateProduct, putProduct);
router.put('/products/:id', checkValidateProduct, putProduct);
router.delete('/products/:id', deleteProduct);

export default router;
