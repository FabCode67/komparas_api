"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
dotenv_1.default.config();
let uri;
uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@komparas.jx1hf07.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => {
    throw error;
});
exports.default = app;
