import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/Cart.js';

const RouterCart = express.Router();
RouterCart.post('/cart', addToCart)
RouterCart.get('/cart/:user_id',getCart)
RouterCart.put('/cart/:userId/:idPro',removeFromCart)
export default RouterCart;