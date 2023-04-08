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
exports.AuthController = void 0;
const express_1 = require("express");
const MapModel_1 = require("../models/MapModel");
const Game_1 = require("../game/Game");
const CodeModel_1 = require("../models/CodeModel");
const UserModel_1 = require("../models/UserModel");
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class AuthController {
    constructor() {
        this.route = "/auth";
        this.router = (0, express_1.Router)();
        this.router.use((0, cors_1.default)({ origin: "*" }));
        this.router.post('/register', (request, response) => {
            try {
                const data = {
                    username: request.body.username,
                    password: bcrypt_1.default.hashSync(request.body.password, 10),
                    firstName: request.body.firstName,
                    lastname: request.body.lastname,
                    email: request.body.email
                };
                const newUser = new UserModel_1.UserModel(data);
                newUser.save();
                return response.sendStatus(200);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        });
        this.router.post('/login', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.UserModel.findOne({ username: request.body.username });
                if (user == null)
                    return response.status(500);
                if (bcrypt_1.default.compareSync(request.body.password, user.password)) {
                    const obj = {
                        user: user.username
                    };
                    const token = jsonwebtoken_1.default.sign(obj, "wb6UxoNuoMb49hkqdqkXQqwQmSQsRlu6l8TczU1I3YoBXsHW6R8mqETCOKaCQswU");
                    return response.json({ token: token });
                }
                else {
                    response.status(400).json({ msg: "Invalid credentials" });
                }
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getMaps', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("usao");
                const maps = yield MapModel_1.MapModel.find();
                console.log(typeof maps);
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
        this.router.post('/addCode', (request, response) => {
            try {
                const newCode = new CodeModel_1.CodeModel(request.body);
                newCode.save();
                return response.sendStatus(200);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        });
        this.router.get('/getCodes', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const codes = yield CodeModel_1.CodeModel.find();
                return response.status(200).json(codes);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getCode/:title', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const code = yield CodeModel_1.CodeModel.findOne({ title: request.params.title });
                return response.status(200).json(code);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
    }
}
exports.AuthController = AuthController;
