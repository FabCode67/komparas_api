import PostUser from "./PostUser";
import GetUser from "./GetUser";
import GetAllUsers from "./GetAllUsers";
import Login from "./Login";
import DeleteUser from "./DeleteUser";
import GetAllCategories from "../categories/GetAllCategories";
import AddCategory from "../categories/AddCategory";
import GetCategoryByNameOrID from "../categories/GetCategoryByNameOrID";
import DeleteCategory from "../categories/DeleteCategory";
import GetParentCategories from "../categories/GetParentCategories";
import AddShop from "../shop/AddShop";
import GetAllShops from "../shop/GetAllShops";
import GetSingleShop from "../shop/GetSingleShop";
import UpdateShop from "../shop/UpdateShop";
import DeleteShop from "../shop/DeleteShop";
import AddProduct from "../products/AddProduct";
import GetAllProducts from "../products/GetAllProducts";
import updateProduct from "../products/updateProduct";
import DeleteProduct from "../products/DeleteProduct";
import GetProductByImage from "../products/GetProductByImage";
export default {

    paths: {
        '/users/add': {
            ...PostUser, 
        },
        '/users/{id}': {
            ...GetUser,
        },
        '/users': {
            ...GetAllUsers,
        },
        '/users/delete/{id}': {
            ...DeleteUser,
        },
        '/login': {
            ...Login,
        },
        '/category/add': {
            ...AddCategory,
        },
        '/categories/all': {
            ...GetAllCategories,
        },
        '/categories/{category}': {
            ...GetCategoryByNameOrID,
        },
        '/categories/parents': {
            ...GetParentCategories,
        },
        '/categories/{category_id}': {
            ...DeleteCategory,
        },
        '/shops/add': {
            ...AddShop,
        },
        '/shops': {
            ...GetAllShops,
        },
        '/shops/{id}': {
            ...GetSingleShop,
            ...UpdateShop,
            ...DeleteShop,
        },
        '/products/add': {
            ...AddProduct,
        },
        '/products': {
            ...GetAllProducts,
        },
        '/products/{productId}': {
            ...updateProduct,
            ...DeleteProduct,
        },
        '/products/images/{productId}': {
            ...GetProductByImage,
        },
    },
};
