import mongoose from "mongoose";
const OrderSchema = mongoose.Schema({
    userId: String,
    name: String,
    address: String,
    phone: Number,
	total : Number,
    status: String,
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
export default mongoose.model('orders',OrderSchema)