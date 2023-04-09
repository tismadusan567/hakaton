"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeModel = exports.CodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CodeSchema = new mongoose_1.Schema({
    title: String,
    problemDescription: String,
    sourceCode: String,
    complicity: Number,
    userRating: Number,
    creatorUsername: String,
    mapTitle: String,
    hints: [new mongoose_1.Schema({ hint: String })]
});
exports.CodeModel = (0, mongoose_1.model)("Code", exports.CodeSchema);
