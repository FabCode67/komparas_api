import { Schema, model, Document } from 'mongoose';
import { INotification } from '../types/notification';

const NotificationSchema = new Schema<INotification>({
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });


const Notification = model<INotification>('Notification', NotificationSchema);

export default Notification;