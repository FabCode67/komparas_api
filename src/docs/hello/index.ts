import getHello from "./getHello";
import postHello from "./postHello";
export default {
    paths: {
        '/hello': {
            ...getHello,
            ...postHello
        },
    },
};