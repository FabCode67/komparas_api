import { Schema, model } from 'mongoose';
import {IKomparasCode} from '../types/komparasCode';

const KomparasCodeSchema = new Schema<IKomparasCode>({
    fullName: { type: String},
    phoneNumberOrEmail: { type: String},
    checkbox1: { type: Boolean},
    checkbox2: { type: Boolean},
    checkbox3: { type: Boolean},
    contactMethod: { type: String},
    komparasCode: { type: String},
    shopId: { type: String},
    shopName: { type: String},
    shopEmail: { type: String},
    product_id: { type: String},
    sold_confirm: { type: Boolean, default: false},
    shop_sold_confirm: { type: Boolean, default: false, required: true},
},
     { timestamps: true });

const KomparasCode = model<IKomparasCode>('KomparasCode', KomparasCodeSchema);

export default KomparasCode;