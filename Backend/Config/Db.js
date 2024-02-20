import mongoose from "mongoose";
import colors from 'colors'
const connection=async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URL);
     console.log(`connected to database ${mongoose.connection.host}`)   
    } catch (error) {
     console.log(error);   
    }
}
export default connection