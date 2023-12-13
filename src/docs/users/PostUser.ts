export default {
    post: {
        tags: ["User CRUD operations"],
        description: "Add new User",
        operationId: "addUser",
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            first_name: { type: "string" },
                            last_name: { type: "string" },
                            email: { type: "string", format: "email" },
                            password: { type: "string", minLength: 8 },
                            confirm_password: { type: "string" },
                            role: { type: "string" },
                            // Assuming 'file' is the field name for the image
                            file: { type: "string", format: "binary" },
                        },
                        required: ["first_name", "last_name", "email", "password", "confirm_password", "role"],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "User was added",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
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
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the user",
                        },
                    },
                },
            },
        },
    },
};
