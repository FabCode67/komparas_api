"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Hollo world"],
        description: "project initialization",
        operationId: "getHello",
        responses: {
            "200": {
                description: "Hello were obtained",
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
