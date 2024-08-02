import mongoose,{Schema} from 'mongoose';
import dotenv from 'dotenv';
const connectdb = async()=>{
    try {
        const url = dotenv.config().parsed.DB_URL;
        // console.log(url);s
       const connect = await  mongoose.connect(url);
       console.log(`Connect to DB successfully`);
    } catch (error) {
        console.log(`Can not access MongoDB`);
    }
}
export default connectdb;