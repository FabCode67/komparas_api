export default {
    get: {
        tags: ["Users CRUD operations"],
        description: "Get user by id",
        operationId: "getUser",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "string",
                },
                required: true,
            },
        ],
        responses: {
            "200": {
                description: "User was obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
                        },
                    },
                },
            },
            "404": {
                description: "User was not found",
            },
        },
    },
}