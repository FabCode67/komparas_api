"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Hello CRUD operations"],
        description: "Add new Hello",
        operationId: "addHello",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Hello",
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Hello was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Hello",
                        },
                    },
                },
            },
        },
    },
};
