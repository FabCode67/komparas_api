export default {
    get:{
        tags:['Shop'],
        description:'Get Single Shop',
        operationId:'getSingleShop',
        parameters:[
            {
                name:'id',
                in:'path',
                schema:{
                    type:'string',
                },
                required:true,
            },
        ],
        responses:{
            '200':{
                description:'Get Single Shop',
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Shop',
                        },
                    },
                },
            },
            '404':{
                description:'Shop was not found',
            },
        },
    },
    }