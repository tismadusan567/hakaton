"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
class GameController {
    constructor() {
        this.route = "/game";
        this.router = (0, express_1.Router)();
        this.router.use((0, cors_1.default)({ origin: "*" }));
        this.router.get('/check', (request, response) => {
            try {
                const code = request.body;
                console.log(code);
                // do the game checking logic
                return response.status(200).json({ msg: "Sve okej" });
            }
            catch (e) {
                return response.status(500).send(e);
            }
        });
    }
}
exports.GameController = GameController;
