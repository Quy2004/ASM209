import express from "express";
import { AddNewOrder, getOrder } from "../controller/Oder.js";

const routeroder = express.Router();
routeroder.post('/Oder',AddNewOrder)
routeroder.get('/Oder',getOrder)
export default routeroder