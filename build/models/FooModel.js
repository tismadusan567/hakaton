"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooModel = exports.FooSchema = void 0;
const mongoose_1 = require("mongoose");
// string - ts type
// String - mongoose type
exports.FooSchema = new mongoose_1.Schema({
    name: String
}, {
    collection: "foo"
});
exports.FooModel = (0, mongoose_1.model)("foo", exports.FooSchema);
