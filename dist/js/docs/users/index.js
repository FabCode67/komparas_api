"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostUser_1 = __importDefault(require("./PostUser"));
const GetUser_1 = __importDefault(require("./GetUser"));
const GetAllUsers_1 = __importDefault(require("./GetAllUsers"));
const Login_1 = __importDefault(require("./Login"));
const DeleteUser_1 = __importDefault(require("./DeleteUser"));
const GetAllCategories_1 = __importDefault(require("../categories/GetAllCategories"));
const AddCategory_1 = __importDefault(require("../categories/AddCategory"));
const GetCategoryByNameOrID_1 = __importDefault(require("../categories/GetCategoryByNameOrID"));
const DeleteCategory_1 = __importDefault(require("../categories/DeleteCategory"));
const GetParentCategories_1 = __importDefault(require("../categories/GetParentCategories"));
const AddShop_1 = __importDefault(require("../shop/AddShop"));
const GetAllShops_1 = __importDefault(require("../shop/GetAllShops"));
const GetSingleShop_1 = __importDefault(require("../shop/GetSingleShop"));
const UpdateShop_1 = __importDefault(require("../shop/UpdateShop"));
const DeleteShop_1 = __importDefault(require("../shop/DeleteShop"));
const AddProduct_1 = __importDefault(require("../products/AddProduct"));
const GetAllProducts_1 = __importDefault(require("../products/GetAllProducts"));
const updateProduct_1 = __importDefault(require("../products/updateProduct"));
const DeleteProduct_1 = __importDefault(require("../products/DeleteProduct"));
const GetProductByImage_1 = __importDefault(require("../products/GetProductByImage"));
const AddProductImage_1 = __importDefault(require("../products/AddProductImage"));
exports.default = {
    paths: {
        '/users/add': Object.assign({}, PostUser_1.default),
        '/users/{id}': Object.assign({}, GetUser_1.default),
        '/users': Object.assign({}, GetAllUsers_1.default),
        '/users/delete/{id}': Object.assign({}, DeleteUser_1.default),
        '/login': Object.assign({}, Login_1.default),
        '/category/add': Object.assign({}, AddCategory_1.default),
        '/categories/all': Object.assign({}, GetAllCategories_1.default),
        '/categories/{category}': Object.assign({}, GetCategoryByNameOrID_1.default),
        '/categories/parents': Object.assign({}, GetParentCategories_1.default),
        '/categories/{category_id}': Object.assign({}, DeleteCategory_1.default),
        '/shops/add': Object.assign({}, AddShop_1.default),
        '/shops': Object.assign({}, GetAllShops_1.default),
        '/shops/{id}': Object.assign(Object.assign(Object.assign({}, GetSingleShop_1.default), UpdateShop_1.default), DeleteShop_1.default),
        '/products/add': Object.assign({}, AddProduct_1.default),
        '/products': Object.assign({}, GetAllProducts_1.default),
        '/products/{productId}': Object.assign(Object.assign({}, updateProduct_1.default), DeleteProduct_1.default),
        '/products/images/{productId}': Object.assign({}, GetProductByImage_1.default),
        '/product_images/{product_id}': Object.assign({}, AddProductImage_1.default),
    },
};
