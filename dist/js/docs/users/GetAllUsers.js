"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Users"],
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
            "200": {
                description: "Users were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
                        },
                    },
                },
            },
            "404": {
                description: "Users were not found",
            },
        },
    },
};
