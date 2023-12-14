export default {
    get: {
        tags: ["Categories"],
        description: "Get all categories",
        operationId: "getAllCategories",
        responses: {
            "200": {
                description: "Categories were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/Category"
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
                            message: "An error occurred while obtaining the categories"
                        }
                    }
                }
            }
        }
    }
};