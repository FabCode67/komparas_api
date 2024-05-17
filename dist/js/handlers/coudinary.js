"use strict";
// cloudinaryConfig.ts
// import { v2 as cloudinary } from "cloudinary";
Object.defineProperty(exports, "__esModule", { value: true });
// cloudinary.config({ 
//   cloud_name: 'dqksbyovs', 
//   api_key: '298781338488113', 
//   api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o' 
// });
// export default cloudinary;
const cloudinary_1 = require("cloudinary");
// import dotenv from "dotenv";
// dotenv.config();
cloudinary_1.v2.config({
    cloud_name: 'dqksbyovs',
    api_key: '298781338488113',
    api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o'
});
exports.default = cloudinary_1.v2;
