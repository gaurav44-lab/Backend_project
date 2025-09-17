import express from "express"
import cars from "cars"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true 
}))

// settings for express to recieves data from url , json , body(form) etc
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({ extended : true ,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}