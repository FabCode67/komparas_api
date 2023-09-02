// cloudinaryConfig.ts
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({ 
//   cloud_name: 'dqksbyovs', 
//   api_key: '298781338488113', 
//   api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o' 
// });

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

cloudinary.config({
  cloud_name: 'dqksbyovs', 
  api_key: '298781338488113', 
  api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o' 
  });
export default cloudinary;