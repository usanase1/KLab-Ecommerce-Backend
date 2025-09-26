import {Schema, Document, model} from 'mongoose';

export interface IUser extends Document {
    fullname: string,
    email: string,
    password: string,
    accessToken: string,
    userRole: string
}

const userSchema = new Schema<IUser>({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessToken: {type: String},
    userRole:{ enum: ['user', 'admin'], default: 'admin', type: String}


}, {timestamps:true});

export const User = model<IUser>('User', userSchema);