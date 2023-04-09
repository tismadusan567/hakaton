import { Model, model, Schema, Types } from "mongoose";

export enum NodeType {
    Empty = 0,
    Obstacle = 1,
    Player = 2,
    Portal = 3,
    Finish = 4
}

export interface IMap {
    title: string;
    description: string;
    width: number;
    height: number;
    complicityRating: number;
    userRating: number;
    creatorUsername: string;
    numOfUserGrades: number;
    numOfComplicityGrades: number;
    levelMap: INode[];
}

export interface INode {
    _id: Types.ObjectId;
    type: number;
    img: string;
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
    numOfUserGrades: Number,
    numOfComplicityGrades: Number,
    creatorUsername: String,
    levelMap: [new Schema<INode>({ type: Number, portalCoordinate: Number, img: String })]
});

export const MapModel = model<IMap, MapModelType>("Map", MapSchema);