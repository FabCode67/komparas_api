import { Schema, model, Document } from 'mongoose';
import { IContact } from '../types/contact';

const ContactSchema = new Schema<IContact>({
    name: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    message: { type: String, required: true },
}, { timestamps: true });

const Contact = model<IContact>('Contact', ContactSchema);

export default Contact;