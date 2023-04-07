import {model, Schema} from "mongoose";

export interface IFoo {
    name: string;
}

// string - ts type
// String - mongoose type

export const FooSchema = new Schema<IFoo>({
    name: String
}, {
    collection: "foo"
});

export const FooModel = model<IFoo>("foo", FooSchema);