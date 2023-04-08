import {Model, model, Schema, Types} from "mongoose";

export interface IUser {
    title: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
}
