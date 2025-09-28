
import {asyncHandler} from "../utils/asynchandler.js"
import { ApiError } from "../utils/ApiError.js";
import {user} from "../models/user.model.js" ;
import {uploadoncloudinary } from "../utils/cloudinary.js" ;
import {Apiresponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req , res) =>{
    

    console.log("👉 DEBUG: req.body =", req.body);
console.log("👉 DEBUG: req.files =", req.files);


    // steps for user creation 
    // 1. get user details from frontend 
    // 2. validation-not empty
    // 3. check if user already exists : username , email 
    // 4. check for images , check for avatar 
    // 5. upload them to cloudinary , avatar 
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field response
    // 8. check for user creation
    // 9. return response


const {fullname , email , username , password} = req.body
console.log("email : " , email);

if ([ fullname , email , password , username].some((field)=>!field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required")
}



 const existeduser = await user.findOne({
    $or: [{username} ,{email}]
})

if (existeduser) {
    throw new ApiError(409 ," user with email or username already exists")
}


const avatarlocalpath = req.files?.avatar[0]?.path;
const coverimagelocalpath = req.files?.coverImage[0]?.path ;

// checking in the field if the file existed 
if (!avatarlocalpath){
    throw new ApiError(400 , "Avatar file is required")

}

const avatar = await uploadoncloudinary(avatarlocalpath)
const coverImage = await uploadoncloudinary(coverimagelocalpath)

// checking again for in the cloudinary if the file existed

if (!avatar){
    throw new ApiError(400 , "Avatar file is required")

}

// create user object - create entry in db
    // remove password and refresh token field response (to the user)

 const User = await user.create({
    fullname, 
    avatar : avatar.url ,
    coverImage : coverImage?.url || "",
    email , 
    password ,
   username : username ? username.toLowerCase() : ""

})

const createdUser = await user.findById(User._id).select(
    "-password -refreshToken"
) 

if(!createdUser){
    throw new ApiError(500, "something went wrong")
}

return res.status(201).json(
    new Apiresponse(200 , createdUser , "user registered successfully")

)
})



export {registerUser}
