import {Model, model, Schema, Types} from "mongoose";

export interface ICode {
    title: string;
    problemDescription: string;
    sourceCode: string;
    complicity: number;
    userRating: number;
    creatorUsername: string;
    mapTitle:string;
    hints: IHint[];
}

export interface IHint {
    _id: Types.ObjectId;
    hint: string;
}

type CodeDocumentProps = {
    hints: Types.DocumentArray<IHint>;
}

type CodeModelType = Model<ICode, {}, CodeDocumentProps>;

export const CodeSchema = new Schema<ICode, CodeModelType>({
    title: String,
    problemDescription: String,
    sourceCode: String,
    complicity: Number,
    userRating: Number,
    creatorUsername: String,
    mapTitle: String,
    hints: [new Schema<IHint>({hint: String})]
});

export const CodeModel = model<ICode, CodeModelType>("Code", CodeSchema);

