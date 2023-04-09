"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapModel = exports.MapSchema = exports.NodeType = void 0;
const mongoose_1 = require("mongoose");
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Empty"] = 0] = "Empty";
    NodeType[NodeType["Obstacle"] = 1] = "Obstacle";
    NodeType[NodeType["Player"] = 2] = "Player";
    NodeType[NodeType["Portal"] = 3] = "Portal";
    NodeType[NodeType["Finish"] = 4] = "Finish";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
// string - ts type
// String - mongoose type
exports.MapSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    width: Number,
    height: Number,
    complicityRating: Number,
    userRating: Number,
    numOfUserGrades: Number,
    numOfComplicityGrades: Number,
    creatorUsername: String,
    levelMap: [new mongoose_1.Schema({ type: Number, portalCoordinate: Number, img: String })]
});
exports.MapModel = (0, mongoose_1.model)("Map", exports.MapSchema);
