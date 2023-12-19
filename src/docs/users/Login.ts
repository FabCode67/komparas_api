export default {
    post:{
        tags: ["Auth"],
        description: "Login user",
        operationId: "loginUser",
        parameters: [],
        requestBody: {
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            email:{type:"string",format:"email", example:"admin@gmail.com", description:"Enter your email"},
                            password:{type:"string", example:"P@ssword" ,minLength:8}
                        },
                        required:["email","password"]
                    }
                }
            }
     
    },
    responses: {
        "200": {
            description: "User was logged in",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Users",
                    },
                },
            },
        },
        "400": {
            description: "Bad Request",
            content: {
                "application/json": {
                    example: {
                        status: false,
                        message: "Please fill all required fields",
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    example: {
                        status: false,
                        message: "An error occurred while adding the user",
                    },
                },
            },
        },
    },
},
}