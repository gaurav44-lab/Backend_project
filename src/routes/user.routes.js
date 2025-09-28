//   import {Router} from "express"
// import { registerUser } from "../controllers/user.controllers.js"
//  import { upload } from "../middleware/multer.middleware.js"
//   const router = Router()

//   router.route("/register").post(
//     upload.fields([
//         {
//             name : "avatar",
//             maxCount : 1
//         },
//         {
//             name : "coverImage",
//             maxCount :1
//         }

//     ]) ,
//     registerUser)

//   export default router

// modification 1:

import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "./public/temp";
        // Create folder if not exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Register route
router.post("/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    (req, res, next) => {
        console.log("👉 Incoming request to /register");
        console.log("Files received:", req.files);
        console.log("Body fields:", req.body);
        next(); // pass to controller
    },
    registerUser
);

export default router;
