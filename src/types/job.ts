import Document from 'mongoose';

 interface IjobApplicant extends Document{
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    backgroundInfo: string;
    isPriotized: boolean;
 }

export default IjobApplicant;