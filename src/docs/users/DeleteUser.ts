export default {
    delete:{
        tags: ["Users"],
        description: "Delete user",
        operationId: "deleteUser",
        security: [
            {
              BearerAuth: [],
            },
          ],
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