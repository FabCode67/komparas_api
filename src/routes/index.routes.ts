import userRoutes from "./users/usersCrud.routes";
import helloRoutes from "./hello/hello";
import loginRoutes from "./auth/login.routes";
import roleRoutes from "./users/userRole.routes"
import statusRoutes from "./users/userStatus.routes"

export default {
    userRoutes,
    helloRoutes,
    loginRoutes,
    roleRoutes,
    statusRoutes
};
