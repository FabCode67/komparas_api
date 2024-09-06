import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import allRoutes from "./routes/index.routes";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import docs from "./docs";
import { v2 as cloudinary } from "cloudinary";
import { Server } from 'socket.io';
import http from 'http';

dotenv.config(); // Load environment variables as early as possible

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const corsOpts = {
  origin: "http://localhost:5173", 
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

app.use(allRoutes.userRoutes);
app.use(allRoutes.loginRoutes);
app.use(allRoutes.roleRoutes);
app.use(allRoutes.statusRoutes);
app.use(allRoutes.categoriesRoutes);
app.use(allRoutes.productsRoutes);
app.use(allRoutes.productImageRoutes);
app.use(allRoutes.shopRoutes);
app.use(allRoutes.customerRoutes);
app.use(allRoutes.nativeProductsRoutes);
app.use(allRoutes.comparisionRoutes);
app.use(allRoutes.DayphoneRoutes);
app.use(allRoutes.applicationRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

const port = process.env.PORT || 10000;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@komparas.jx1hf07.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    throw error;
  });

export default app;
export { server, io };
