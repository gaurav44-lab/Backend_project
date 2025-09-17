import mongoose from "mongoose"
import {db_name} from "../constants.js"

export const connectDB = async () =>{
 try {

    const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
    console.log(`\n mongodb connected !!! DB HOST : ${connectioninstance.connection.host}`);
    
 } catch (error) {
    
    console.log("mongodb connecton can't be established " , error);
    process.exit(1)
    
 }

}

