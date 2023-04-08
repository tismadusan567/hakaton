"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastname: String,
    email: String,
    password: String,
    username: String
});
exports.UserModel = (0, mongoose_1.model)("User", exports.UserSchema);
