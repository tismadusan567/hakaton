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
exports.GameController = void 0;
const express_1 = require("express");
const MapModel_1 = require("../models/MapModel");
const cors_1 = __importDefault(require("cors"));
const Game_1 = require("../game/Game");
class GameController {
    constructor() {
        this.route = "/game";
        this.router = (0, express_1.Router)();
        this.router.use((0, cors_1.default)({ origin: "*" }));
        this.router.post('/check', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const code = request.body.source;
                const map = yield MapModel_1.MapModel.findOne({ title: request.body.title });
                if (map == null) {
                    return response.status(404).json({ msg: "Map not found" });
                }
                console.log(code);
                const res = (0, Game_1.runGame)(map, code);
                // do the game checking logic
                return response.status(200).json(res);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
    }
}
exports.GameController = GameController;
