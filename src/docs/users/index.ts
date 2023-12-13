import PostUser from "./PostUser";
import GetUser from "./GetUser";
import GetAllUsers from "./GetAllUsers";
import Login from "./Login";
import DeleteUser from "./DeleteUser";

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
    },
};
