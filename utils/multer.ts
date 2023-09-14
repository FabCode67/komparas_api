import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const singleUpload = upload.single('product_image'); 
export default singleUpload;
