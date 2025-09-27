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

import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
  // Debug log before multer
  (req, res, next) => {
    console.log("👉 Incoming request to /register");
    console.log("👉 Content-Type:", req.headers["content-type"]);
    next();
  },

  // Multer middleware
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),

  // Debug log after multer, before controller
  (req, res, next) => {
    console.log("✅ Multer executed");
    console.log("Files received:", req.files);
    console.log("Body fields:", req.body);
    next();
  },

  // Your actual controller
  registerUser
);

export default router;
