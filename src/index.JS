import dotenv from "dotenv"
import {connectDB} from "./db/indexdb.js"

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 7000 ,()=> {
        console.log((`server is running at port : ${process.env.PORT}`));
        

    })


})
.catch((err) =>{
    console.log("MONGODB connection failed sadly !!");
    
})




// import express from "express"
// const app = express()

// (async ()=> {

//     try {
//      await  mongoose.connect(`${process.env.MONGODB_URL}/{db_name}`)
//         app.on("error" , (error) => {
//             console.log("ERR:" , error)
//             throw error
//         })

//         app.listen(process.env.PORT ,() =>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR : " ,error)
//         throw err
        
//     }
// }) ()