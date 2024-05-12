"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Categories"],
        description: "Add category",
        operationId: "addCategory",
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
                            name: { type: "string", example: "Category name" },
                            parent_id: { type: "string", example: "Parent category id" },
                        },
                        required: ["name"]
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Category was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/Category"
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
                            message: "An error occurred while adding the category"
                        }
                    }
                }
            }
        }
    }
};
