"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    openapi: "3.0.3",
    info: {
        title: "Komparas API",
        description: "komparas from creativa poeta",
        version: "1.0.0",
        contact: {
            name: "Fabrice MWANAFUNZI",
            email: "fabrice.mwanafunzi@karisimbi.rw",
            url: "web.com",
        },
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "apiKey",
                scheme: "bearer",
                bearerFormat: "JWT",
                name: "Authorization",
                in: "header",
            },
        },
    },
};
