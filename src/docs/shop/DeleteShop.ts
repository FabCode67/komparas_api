export default {
    delete: {
        tags: ['Shop'],
        description: 'Delete shop by id',
        operationId: 'deleteShop',
        security: [
            {
              BearerAuth: [],
            },
          ],
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/id',
                },
                required: true,
                description: 'Shop id',
            },
        ],
        responses: {
            '200': {
                description: 'Shop deleted successfully',
            },
            '404': {
                description: 'Shop not found',
            },
        },
    },
    }