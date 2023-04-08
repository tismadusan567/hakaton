import { Model, model, Schema, Types } from "mongoose";

export interface IMap {
    title: string;
    description: string;
    width: number;
    height: number;
    complicityRating: number;
    userRating: number;
    levelMap: INode[];
}

export interface INode {
    _id: Types.ObjectId;
    type: number;
    portalCoordinate: number;
}

type MapDocumentProps = {
    levelMap: Types.DocumentArray<INode>;
};

type MapModelType = Model<IMap, {}, MapDocumentProps>;

// string - ts type
// String - mongoose type

export const MapSchema = new Schema<IMap, MapModelType>({
    title: String,
    description: String,
    width: Number,
    height: Number,
    complicityRating: Number,
    userRating: Number,
    levelMap: [new Schema<INode>({ type: Number, portalCoordinate: Number })]
});

export const MapModel = model<IMap, MapModelType>("Map", MapSchema);