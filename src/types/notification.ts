
export interface INotification extends Document {
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
