"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Categories'],
        description: 'Get category by name or ID',
        operationId: 'getCategoryByNameOrID',
        parameters: [
            {
                name: 'category',
                in: 'path',
                description: 'Category name or ID',
                required: true,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            '200': {
                description: 'Category was obtained',
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
                            message: 'An error occurred while obtaining the category',
                        },
                    },
                },
            },
        },
    },
};
