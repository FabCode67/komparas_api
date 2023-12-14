export default {
    get: {
        tags: ['Categories'],
        description: 'Get parent categories',
        operationId: 'getParentCategories',
        responses: {
            '200': {
                description: 'Parent categories were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/Category',
                        },
                    },
                },
            },
            '500': {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        example: {
                            status: false,
                            message: 'An error occurred while obtaining the categories',
                        },
                    },
                },
            },
        },
    },
};