import mongoose from "mongoose";
const OrderSchema = mongoose.Schema({
    userId: String,
    name: String,
    address: String,
    phone: String,
	total : Number,
	products: [{
        id:mongoose.Schema.Types.ObjectId,
        name: String,
        image:String,
        price:Number,
        quantity: Number, 
		
    }],
    
},
{
    timestamps:true
}
)
export const Order = mongoose.model('orders',OrderSchema)