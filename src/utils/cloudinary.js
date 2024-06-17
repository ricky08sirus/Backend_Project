import {v2 as cloudinary} from "cloudinary"

import fs from "fs"  //fs is a file system

//import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

// const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//     public_id: "shoes"
// }).catch((error)=>{console.log(error)});


const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        }) 
        //we can give many other things to upload
        //file has been uploaded sucessfully
        console.log("file is uploaded on cloudinary",response.url);
        return response;




            
        
        
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the locally saved temporary file as the upload operation got failed

        return null;

        
    }
}

export {uploadOnCloudinary}


