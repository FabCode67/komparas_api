export default {
    put: {
        tags:["Products"],
        description:"Update product",
        operationId:"updateProduct",
        // security:[
        //     {
        //         BearerAuth:[]
        //     }
        // ],
        
        parameters:[
            {
                name:"productId",
                in:"path",
                schema:{
                    type:"string"
                },
                required:true
            }
        ],
        requestBody:{
            content :{
                "multipart/form-data":{
                    schema:{
                        type:"object",
                        properties:{
                            product_name:{type:"string", example:"Product name"},
                            product_description:{type:"string", example:"Product description"},
                            product_price:{type:"number", example:100},
                            category_name:{type:"string", example:"Category name"},
                            product_image:{type:"string", format:"binary"},
                            vendor_ids:{type:"string", example:"Vendor id"},
                        },
                        required:["category_name", "product_image"]
                    },
                },
            },
        },
        responses:{
            "200":{
                description:"Product was updated",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#components/schemas/Products"
                        }
                    }
                }
            },
            "400":{
                description:"Bad Request",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Please fill all required fields"
                        }
                    }
                }
            },
            "401":{
                description:"Unauthorized",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Access denied due to invalid token"
                        }
                    }
                }
            },
            "404":{
                description:"Not found",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Product not found"
                        }
                    }
                }
            }
        },

        "500":{
            description:"Internal Server Error",
            content:{
                "application/json":{
                    example:{
                        status:false,
                        message:"An error occurred while updating the product"
                    }
                }
            }
        }
    }
}