export default {
    get: {
        tags:["Products"],
        description:"Get all products",
        operationId:"getAllProducts",
        responses:{
            "200":{
                description:"Products were obtained",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#components/schemas/Products"
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
                            message:"An error occurred while obtaining the products"
                        }
                    }
                }
            }
        }
    }
}