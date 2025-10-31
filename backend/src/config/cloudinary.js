// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filePath) => {
//   if (!filePath) throw new Error("File path is required for upload");

//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//     });
//     fs.unlinkSync(filePath);
//     return result;
//   } catch (error) {
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };

// export default uploadOnCloudinary;


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload using buffer
const uploadOnCloudinary = async (fileBuffer) => {
  if (!fileBuffer) throw new Error("File buffer is required for upload");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "profiles" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

export default uploadOnCloudinary;
