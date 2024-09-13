// fullName: '',
// phoneNumber: '',
// checkbox1: false,
// checkbox2: false,
// checkbox3: false,
// contactMethod: 'whatsapp',
// komparasCode: '',
// shopId: shopData._id,
// shopName: shopData.name,

export interface IKomparasCode extends Document {
    save(): IKomparasCode | PromiseLike<IKomparasCode>;
    fullName:string;
    phoneNumberOrEmail:string;
    checkbox1:boolean;
    checkbox2:boolean;
    checkbox3:boolean;
    contactMethod:string;
    komparasCode:string;
    shopId:any;
    shopName:string;
    shopEmail:string;
    product_id:string | any;
    sold_confirm:boolean;
    shop_sold_confirm:boolean;
}

