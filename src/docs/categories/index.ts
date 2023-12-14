import AddCategory from "./AddCategory";
import GetAllCategories from "./GetAllCategories";

export default {
    paths: {
        '/category/add': {
            ...AddCategory,
        },
        '/categories/all': {
            ...GetAllCategories,
        },
    },
};