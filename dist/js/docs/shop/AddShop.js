"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Shop"],
        description: "Add shop",
        operationId: "addShop",
        security: [
            {
                BearerAuth: [],
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Ikaze shop" },
                            location: { type: "string", example: "Lagos" },
                            phone: { type: "string", example: "0788888888" },
                            email: { type: "string", example: "ikaze@gmail.com" },
                            description: { type: "string", example: "Here we sell all kinds of clothes" },
                            working_hours: { type: "string", example: "8:00-18:00" },
                        },
                        required: ["name", "location", "phone", "email", "description", "working_hours"]
                    }
                }
            }
        },
        responses: {
            "201": {
                description: "Shop was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/Shop"
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
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the shop"
                        }
                    }
                }
            }
        }
    }
};
