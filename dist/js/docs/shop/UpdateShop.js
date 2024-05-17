"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    put: {
        tags: ['Shop'],
        description: 'Update shop by id',
        operationId: 'updateShop',
        security: [
            {
                BearerAuth: [],
            },
        ],
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID of shop to update',
                schema: {
                    type: 'string',
                },
            },
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Shop',
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Shop updated successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Shop',
                        },
                    },
                },
            },
            '404': {
                description: 'Shop not found',
            },
        },
    },
};
