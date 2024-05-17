"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersCrud_routes_1 = __importDefault(require("./users/usersCrud.routes"));
const login_routes_1 = __importDefault(require("./auth/login.routes"));
const userRole_routes_1 = __importDefault(require("./users/userRole.routes"));
const userStatus_routes_1 = __importDefault(require("./users/userStatus.routes"));
const categories_routes_1 = __importDefault(require("./categories/categories.routes"));
const productsCrud_routes_1 = __importDefault(require("./products/productsCrud.routes"));
const productImage_routes_1 = __importDefault(require("./products/productImage.routes"));
// import newCatrouters from "../controllers/categories/p_category"
const shop_routes_1 = __importDefault(require("./shop/shop.routes"));
const customer_routes_1 = __importDefault(require("./customer/customer.routes"));
const nativeProducts_routes_1 = __importDefault(require("./products/nativeProducts.routes"));
const comparision_routes_1 = __importDefault(require("./comparision/comparision.routes"));
const offer_routes_1 = __importDefault(require("./products/offer.routes"));
exports.default = {
    userRoutes: usersCrud_routes_1.default,
    loginRoutes: login_routes_1.default,
    roleRoutes: userRole_routes_1.default,
    statusRoutes: userStatus_routes_1.default,
    categoriesRoutes: categories_routes_1.default,
    productsRoutes: productsCrud_routes_1.default,
    productImageRoutes: productImage_routes_1.default,
    shopRoutes: shop_routes_1.default,
    customerRoutes: customer_routes_1.default,
    nativeProductsRoutes: nativeProducts_routes_1.default,
    comparisionRoutes: comparision_routes_1.default,
    DayphoneRoutes: offer_routes_1.default
};
