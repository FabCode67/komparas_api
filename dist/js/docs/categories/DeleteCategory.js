"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    delete: {
        tags: ["Categories"],
        description: "Delete a category",
        operationId: "deleteCategory",
        security: [
            {
                BearerAuth: [],
            },
        ],
        parameters: [
            {
                name: "category_id",
                in: "path",
                schema: {
                    type: "string",
                },
                required: true,
                description: "ID of category to delete",
            },
        ],
        responses: {
            200: {
                description: "Category deleted successfully",
            },
            404: {
                description: "Category not found",
            },
        },
    }
};
