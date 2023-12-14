export default {
    get: {
        tags: ['Shop'],
        description: 'Get all shops',
        operationId: 'getAllShops',
        parameters: [],
        responses: {
            '200': {
                description: 'Get all shops',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Shop',
                        },
                    },
                },
            },
        },
    },

}