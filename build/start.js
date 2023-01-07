"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const server_1 = require("./server");
const server = new server_1.Server();
server.run();
const app = server.app;
exports.app = app;
