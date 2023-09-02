import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import allRoutes from "./routes/index.routes";
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express";
import docs from "./docs";
import formidable from 'express-formidable';
import upload from "./handlers/multer";

const app: Express = express();

const PORT: string | number = process.env.PORT || 3002;

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/users/add", upload.single("profile_picture"));

app.use(allRoutes.helloRoutes);
app.use(allRoutes.userRoutes);
app.use(allRoutes.loginRoutes);
app.use(allRoutes.roleRoutes)
app.use(allRoutes.statusRoutes)
app.use(allRoutes.categoriesRoutes)
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