// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public"); // Folder to save files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Unique name
//   },
// });

// const upload = multer({ storage });
// export default upload;


import multer from "multer";

// Use memory storage for serverless environments
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
