import PostUser from "./PostUser";
import GetUser from "./GetUser";

export default {
    paths: {
        '/users/add': {
            ...PostUser,
        },
        '/users/{id}': {
            ...GetUser,
        },
    },
};
