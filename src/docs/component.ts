import { Schema } from "mongoose";

export default {
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
      },
  
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

        Users: {
          type: "object",
          properties: {
            id: {
              $ref: "#/components/schemas/id",
            },
            first_name: {
              type: "string",
              description: "First name",
              example: "John",
            },
            last_name: {
              type: "string",
              description: "Last name",
              example: "Doe",
            },
            email: {
              type: "string",
              description: "Email address",
              example: "test@gmail.com",
            },
            password: {
              type: "string",
              description: "Password",
              example: "12345678",
            },
            confirm_password: {
              type: "string",
              description: "Confirm password",
              example: "12345678",
            },
            role: {
              type: "string",
              description: "Role",
              example: "buyer",
            },
            status: {
              type: "string",
              description: "Status",
              example: "enabled",
            },
            product_image: {
              type: "string",
              description: "Profile picture",
              example: "https://res.cloudinary.com/dq7l8216n/image/upload/v1625769678/product-image/1625769677545-IMG_20210630_144000_1_m4j1xu.jpg",
            },
            resetToken: {
              type: "string",
              description: "Reset token",
              example: "null",
            },
            resetTokenExpiry: {
              type: "number",
              description: "Reset token expiry",
              example: "null",
            },
          },
        },
        Category:{
          type: "object",
          properties:{
            name:{
              type:'string',
              description: "category name",
              example:'phones',
            },
            parent_id:{
              type:Schema.Types.ObjectId,
              decription:"enter sub category"
            },
            children:{
              type:Schema.Types.ObjectId,
              decription:"enter sub category"
            },
          },
        },
        Shop:{
          type: "object",
          properties:{
            name:{
              type:'string',
              description: "shop name",
              example:'ikaze shop',
            },
            location:{
              type:'string',
              description: "shop location",
              example:'kigali',
            },
            phone:{
              type:'string',
              description: "shop phone",
              example:'0788888888',
            },
            email:{
              type:'string',
              description: "shop email",
              example:'ikaze@gmail.com',
            },
            description:{
              type:'string',
              description: "shop description",
              example:'we sell all kinds of clothes',
            },
            working_hours:{
              type:'string',
              description: "shop working hours",
              example:'8:00-18:00',
            },
          },
        },
        Products:{
          type: "object",
          properties:{
            product_name:{
              type:'string',
              description: "product name",
              example:'iphone 12',
            },
            product_description:{
              type:'string',
              description: "product description",
              example:'iphone 12 pro max',
            },
            product_price:{
              type:'number',
              description: "product price",
              example:'1000',
            },
            product_image:{
              type:'string',
              description: "product image",
              example:'https://res.cloudinary.com/dq7l8216n/image/upload/v1625769678/product-image/1625769677545-IMG_20210630_144000_1_m4j1xu.jpg',
            },
            vendors:{
              type:Schema.Types.ObjectId,
              decription:"enter vendor id"
            },
            category:{
              type:Schema.Types.ObjectId,
              decription:"enter category id"
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


