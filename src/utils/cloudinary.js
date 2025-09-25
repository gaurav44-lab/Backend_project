import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});



const uploadoncloudinary = async (localfilepath) =>{
    try{
        if (!localfilepath) return null
        // uploading the file on cloudinary
        const response  = await cloudinary.uploader.upload
        (localfilepath ,{
            resource_type : "auto"
        })
        // fil has been uploaded succesfully
        console.log("file is uploaded on cloudinary" , response.url);
        return response ;
        
    } catch(error){
        fs.unlinkSync(localfilepath) 
        // remove the locally saved temporary file as the upload operation got failed
        return null ;
    }
}

// cloudinary.v2.uploader
// .upload("dog.mp4", {
//   resource_type: "auto", 
//   public_id: "my_dog",
//   overwrite: true, 
//   notification_url: "https://mysite.example.com/notify_endpoint"})
// .then(result=>console.log(result));