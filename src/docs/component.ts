export default {
    components: {
      schemas: {
        id: {
          type: "string",
          description: "An id of an object",
          example: "tyVgf",
        },
        Hello: {
          type: "object",
          properties: {
            id: {
              $ref: "#/components/schemas/id",
            },
            hello: {
              type: "string",
              description: "Hello message",
              example: "hello world",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Not found",
            },
            internal_code: {
              type: "string",
              description: "Error internal code",
              example: "Invalid parameters",
            },
          },
        },
      },
    },
  };
  