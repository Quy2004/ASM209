
import Order  from '../models/Oder .js';

export const AddNewOrder = async (req,res)=>{
    try {
        const body = req.body
        const order = new Order(body)
        const orderres = await order.save()
        res.send(orderres)
    } catch (error) {
        res.send(error)
    } 
}

export const getOrder=async(req,res)=>{
    try {
        const page= req.query.page;
        const limit= req.query.limit;
            const responsive= await Order.find().skip((page-1)*limit).limit(limit);
                res.status(200).send(responsive)
    } catch (error) {
        res.status(503).send({status: false, message: "loi"+error})
    }
}