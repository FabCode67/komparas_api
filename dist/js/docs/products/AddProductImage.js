"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Products"],
        description: "Add product image",
        operationId: "addProductImage",
        security: [
            {
                BearerAuth: []
            }
        ],
        parameters: [
            {
                name: "ProductId",
                in: "path",
                schema: {
                    type: "string"
                },
                required: true
            }
        ],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            product_id: { type: "string", example: "Product id" },
                            product_image: { type: "string", format: "binary" },
                        },
                        required: ["product_image"]
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Product image was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/ProductImages"
                        }
                    }
                }
            },
            "400": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Please fill all required fields"
                        }
                    }
                }
            },
            "401": {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Access denied due to invalid token"
                        }
                    }
                }
            },
            "404": {
                description: "Not Found",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Product not found"
                        }
                    }
                }
            },
            "500": {
                description: "Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Server error"
                        }
                    }
                }
            }
        }
    }
};
