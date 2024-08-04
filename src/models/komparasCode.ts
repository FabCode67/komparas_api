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
    shopName: { type: String}
},
     { timestamps: true });

const KomparasCode = model<IKomparasCode>('KomparasCode', KomparasCodeSchema);

export default KomparasCode;