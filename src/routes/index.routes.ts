import userRoutes from "./users/usersCrud.routes";
import loginRoutes from "./auth/login.routes";
import roleRoutes from "./users/userRole.routes"
import statusRoutes from "./users/userStatus.routes"
import categoriesRoutes from "./categories/categories.routes"
import productsRoutes from "./products/productsCrud.routes"
import productImageRoutes from "./products/productImage.routes"
// import newCatrouters from "../controllers/categories/p_category"

export default {
    userRoutes,
    loginRoutes,
    roleRoutes,
    statusRoutes,
    categoriesRoutes,
    productsRoutes,
    productImageRoutes,
    // newCatrouters
};
