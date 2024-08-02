import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/Cart.js';

const RouterCart = express.Router();
RouterCart.post('/cart/:user_id', addToCart)
RouterCart.get('/cart/:user_id',getCart)
RouterCart.delete('/cart/:id',removeFromCart)
export default RouterCart;