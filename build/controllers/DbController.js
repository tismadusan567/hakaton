"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbController = void 0;
const express_1 = require("express");
const MapModel_1 = require("../models/MapModel");
const cors_1 = __importDefault(require("cors"));
class DbController {
    constructor() {
        this.route = "/db";
        this.router = (0, express_1.Router)();
        this.router.use((0, cors_1.default)({ origin: "*" }));
        this.router.post('/createMap', (request, response) => {
            try {
                const newMap = new MapModel_1.MapModel(request.body);
                newMap.save();
                return response.sendStatus(200);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        });
    }
}
exports.DbController = DbController;
