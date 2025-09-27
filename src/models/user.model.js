import mongoose , {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const user_detail = new mongoose.Schema({
username : {
    type : String ,
    required : true ,
    unique :  true ,
    lowercase : true ,
    trim :  true ,
    index : true

} ,

email : {
    type : String ,
    required : true ,
    trim : true ,
    index : true 
} ,

fullname : {
    type : String ,
    required : true ,
    trim : true ,
    index : true 
} ,


avatar : {
    type : String ,
    required : true ,
    
} ,

coverImage : {
    type : String ,
    required: true
    
},



watchHistory : [{
    type : Schema.Types.ObjectId ,
     ref : "video"
    
}] ,


password : {
    type : String ,
    required : [true , 'password is mandatory'] ,

    
} ,
refreshtoken : {
    type : String ,
     
}

},
{timestamps : true})

// checks the password to modify it every time

user_detail.pre("save" , async function (next){
     if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10)
    next()
})
//  checks the password if it meets the criteria
user_detail.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password , this.password)
}
user_detail.methods.generateAccessToken = function(){
    return jwt.sign(

        {
            _id : this._id ,
            email : this.email ,
            username : this.username ,
            fullname : this.fullname 

        } ,
        process.env.Access_token_secret ,
        {
            expiresIn : process.env.access_token_expiry
        }
    )
}

const user = mongoose.model("user" , user_detail)

export {user}