"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbController = void 0;
const express_1 = require("express");
const MapModel_1 = require("../models/MapModel");
const Game_1 = require("../game/Game");
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
        this.router.get('/getMaps', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const maps = yield MapModel_1.MapModel.find();
                (0, Game_1.runGame)(maps[0], "");
                return response.status(200).json(maps);
            }
            catch (e) {
                console.log(e);
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getMap/:title', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const map = yield MapModel_1.MapModel.findOne({ title: request.params.title });
                console.log(map);
                return response.status(200).json(map);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
    }
}
exports.DbController = DbController;
