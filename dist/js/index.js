"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PATCH',
        'PUT'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
    ],
};
app.use((0, cors_1.default)(corsOpts));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use("/users/add", upload.single("profile_picture"));
cloudinary_1.v2.config({
    cloud_name: 'dqksbyovs',
    api_key: '298781338488113',
    api_secret: 'qsZBss7xJK8yKMoK_ruktBkFt2o'
});
app.use(index_routes_1.default.userRoutes);
app.use(index_routes_1.default.loginRoutes);
app.use(index_routes_1.default.roleRoutes);
app.use(index_routes_1.default.statusRoutes);
app.use(index_routes_1.default.categoriesRoutes);
app.use(index_routes_1.default.productsRoutes);
app.use(index_routes_1.default.productImageRoutes);
app.use(index_routes_1.default.shopRoutes);
app.use(index_routes_1.default.customerRoutes);
app.use(index_routes_1.default.nativeProductsRoutes);
app.use(index_routes_1.default.comparisionRoutes);
app.use(index_routes_1.default.DayphoneRoutes);
// app.use(allRoutes.newCatrouters);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
dotenv_1.default.config();
let uri;
uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@komparas.jx1hf07.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(3000, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => {
    throw error;
});
exports.default = app;
