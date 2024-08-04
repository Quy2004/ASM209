import express from "express"
import { AddNewOrder } from "../controller/Oder.js";

const routeroder = express.Router();
routeroder.post('/Oder',AddNewOrder)
export default routeroder