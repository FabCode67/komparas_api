export default {
    post: {
        tags: ["Products"],
        description: "Add product",
        operationId: "addProduct",
        security: [
            {
                BearerAuth: [],
            },
        ],
        parameters: [],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            product_name: { type: "string", example: "Product name" },
                            product_description: { type: "string", example: "Product description" },
                            product_price: { type: "number", example: 100 },
                            category_name: { type: "string", example: "Category name" },
                            product_image: { type: "string", format: "binary" },
                            vendor_ids: { type: "string", example: "Vendor id" },
                            specifications: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        key: { type: "string", example: "Resolution" },
                                        value: { type: "string", example: "12pxl" },
                                    },
                                },
                                example: [
                                    { key: "Resolution", value: "12pxl" },
                                    { key: "Dimensions", value: "12px * 30px" },
                                ],
                            },
                        },
                        required: [
                            "product_name",
                            "product_description",
                            "product_price",
                            "category_name",
                            "product_image",
                            "vendor_ids",
                            "specifications", // Add specifications to the required list
                        ],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Product was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/Products",
                        },
                    },
                },
            },
            "400": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Please fill all required fields",
                        },
                    },
                },
            },
            "401": {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Access denied due to an invalid token",
                        },
                    },
                },
            },
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the product",
                        },
                    },
                },
            },
        },
    },
};
