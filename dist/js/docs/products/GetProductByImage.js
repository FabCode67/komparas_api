"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Products"],
        description: "Get product by image",
        operationId: "getProductByImage",
        parameters: [
            {
                name: "product_image",
                in: "query",
                schema: {
                    type: "string"
                },
                required: true
            }
        ],
        responses: {
            "200": {
                description: "Product was found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/Products"
                        }
                    }
                }
            },
            "404": {
                description: "Product not found",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Product not found"
                        }
                    }
                }
            }
        }
    }
};
