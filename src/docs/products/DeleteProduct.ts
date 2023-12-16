export default {
    delete: {
        tags:["Products"],
        description:"Delete product",
        operationId:"deleteProduct",
        security:[
            {
                BearerAuth:[]
            }
        ],
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
        responses:{
            "200":{
                description:"Product was deleted",
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
            }
        }
    }
}