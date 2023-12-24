export default {
    delete: {
        tags:["Products"],
        description:"Remove product specification",
        operationId:"removeProductSpecification",
        security:[
            {
                BearerAuth:[]
            }
        ],
        parameters:[
            {
            name:"ProductId",
            in:"path",
            schema:{
                type:"string"
            },
            required:true
            },
            {
            name:"specificationId",
            in:"path",
            schema:{
                type:"string"
            },
            required:true
            }
        ],
        responses:{
            "200":{
                description:"Product specification was removed",
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
                            message:"Unauthorized"
                        }
                    }
                }
            },
            "404":{
                description:"Product not found",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Product not found"
                        }
                    }
                }
            },
            "500":{
                description:"Server error",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Server error"
                        }
                    }
                }
            }
        }
    }
}