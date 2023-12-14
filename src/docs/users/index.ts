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
    },
};
