"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapModel = exports.MapSchema = void 0;
const mongoose_1 = require("mongoose");
// string - ts type
// String - mongoose type
exports.MapSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    width: Number,
    height: Number,
    complicityRating: Number,
    userRating: Number,
    levelMap: [new mongoose_1.Schema({ type: Number, portalCoordinate: Number })]
});
exports.MapModel = (0, mongoose_1.model)("Map", exports.MapSchema);
