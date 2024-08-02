import express from 'express';
import { addCategory, deleteCategory, getById, getCategory, putCategory } from '../controller/categorys.js';
import { checkValidateCategory } from '../middleware/category.js';


const routerCategory = express.Router();
routerCategory.post('/category',checkValidateCategory, addCategory)
routerCategory.get('/category',getCategory)
routerCategory.get('/category/:id',getById)
routerCategory.put('/category/:id', checkValidateCategory, putCategory)
routerCategory.delete('/category/:id',deleteCategory)
export default routerCategory;