// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"

// const app = express()

// app.use(cors({
//     origin : process.env.CORS_ORIGIN ,
//     credentials : true 
// }))

// app.use(cors());

// // settings for express to recieves data from url , json , body(form) etc

// app.use(express.json({limit : "16kb"}))
// app.use(express.urlencoded({ extended : true ,limit : "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())


 

// // routes import
// import userRouter from './routes/user.routes.js'

// // routes declaration 
// app.use("/api/v1/users" , userRouter)

// // http://localhost:6000/api/v1/users/register , actual working/functioning 


// export {app}


// modifications :

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

const app = express();

// CORS
app.use(cors({
    origin: "*", // You can replace * with process.env.CORS_ORIGIN later
    credentials: true
}));

// Static files
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// JSON and URL-encoded data (keep after Multer routes in routes)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use((req, res, next) => {
  console.log("👉 Global Debug: Incoming", req.method, req.url);
  next();
});

app.use("/api/v1/users", userRouter);

export { app };
