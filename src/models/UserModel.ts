import {Model, model, Schema, Types} from "mongoose";

export interface IUser {
    username: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema<IUser>({
    firstName: String,
    lastname: String,
    email: String,
    password: String,
    username: String
});

export const UserModel = model<IUser>("User", UserSchema);