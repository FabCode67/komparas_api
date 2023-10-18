import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import allRoutes from "./routes/index.routes";
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express";
import docs from "./docs";
import { v2 as cloudinary } from "cloudinary";


const app: Express = express();
const PORT: string | number = process.env.PORT || 8080;
const corsOpts = {
  origin: '*',
  
  methods: [
  'GET',
  'POST',
  'DELETE',
  'PATCH'
  ],
  
  allowedHeaders: [
  'Content-Type',
  'Authorization',
  ],
  };
app.use(cors(corsOpts));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/users/add", upload.single("profile_picture"));
cloudinary.config({
  cloud_name: 'dqksbyovs', 
  api_key: '298781338488113', 
  api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o' 
  });

app.use(allRoutes.userRoutes);
app.use(allRoutes.loginRoutes);
app.use(allRoutes.roleRoutes);
app.use(allRoutes.statusRoutes);
app.use(allRoutes.categoriesRoutes);
app.use(allRoutes.productsRoutes);
app.use(allRoutes.productImageRoutes);
app.use(allRoutes.shopRoutes);
// app.use(allRoutes.newCatrouters);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


dotenv.config()


let uri: string;
uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@komparas.jx1hf07.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => {
    throw error;
  });

export default app