import express from 'express';
import { addUser, deleteUser, getById, getUser, putUser } from '../controller/user.js';
import { checkValidateUser } from '../middleware/user.js';


const routerUser = express.Router();
routerUser.post('/user', checkValidateUser, addUser)
routerUser.get('/user',getUser)
routerUser.get('/user/:id',getById)
routerUser.put('/user/:id', checkValidateUser, putUser)
routerUser.delete('/user/:id',deleteUser)
export default routerUser;