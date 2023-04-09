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
const CodeModel_1 = require("../models/CodeModel");
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class DbController {
    checkAuth(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.status(401).json({ msg: "Check auth failed" });
        jsonwebtoken_1.default.verify(token, "wb6UxoNuoMb49hkqdqkXQqwQmSQsRlu6l8TczU1I3YoBXsHW6R8mqETCOKaCQswU", (err, user) => {
            if (err)
                return res.status(403).json({ msg: err });
            const obj = user;
            console.log("Parsed ", obj);
            req.body.creatorUsername = obj.user;
            console.log(req.body.username);
            next();
        });
    }
    convertMapToFrontendMap(map) {
        const frontMap = {
            title: map.title,
            description: map.description,
            width: map.width,
            height: map.height,
            complicityRating: map.complicityRating,
            userRating: map.complicityRating,
            numOfUserGrades: map.numOfUserGrades,
            numOfComplicityGrades: map.numOfComplicityGrades,
            creatorUsername: map.creatorUsername,
            debugTask: map.debugTask,
            levelMap: []
        };
        const frontLevelMap = [];
        for (let i = 0; i < map.height; i++) {
            const temp = [];
            for (let j = 0; j < map.width; j++) {
                temp.push(map.levelMap[i * map.width + j]);
            }
            frontLevelMap.push(temp);
        }
        frontMap.levelMap = frontLevelMap;
        return frontMap;
    }
    convertFrontendMaptoMap(frontMap) {
        const map = new MapModel_1.MapModel({
            title: frontMap.title,
            description: frontMap.description,
            width: frontMap.width,
            height: frontMap.height,
            complicityRating: frontMap.complicityRating,
            userRating: frontMap.userRating,
            numOfUserGrades: frontMap.numOfUserGrades,
            numOfComplicityGrades: frontMap.numOfComplicityGrades,
            debugTask: frontMap.debugTask,
            levelMap: []
        });
        frontMap.levelMap.flat(Infinity).forEach((element) => {
            var _a;
            map.levelMap.push({
                type: (_a = element.type) !== null && _a !== void 0 ? _a : 0,
                portalCoordinate: element.portalCoordinate,
                img: element.img
            });
        });
        return map;
    }
    constructor() {
        this.route = "/db";
        this.router = (0, express_1.Router)();
        this.router.use((0, cors_1.default)({ origin: "*" }));
        this.router.post('/createMap', this.checkAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                request.body.complicityRating = 5;
                request.body.userRating = 5;
                request.body.numOfUserGrades = 1;
                request.body.numOfComplicityGrades = 1;
                request.body.debugTask = (_a = request.body.debugTask) !== null && _a !== void 0 ? _a : false;
                const checkMap = yield MapModel_1.MapModel.findOne({ title: request.body.title });
                if (checkMap)
                    return response.status(400).json({ msg: "Map with that title already exists" });
                const newMap = this.convertFrontendMaptoMap(request.body);
                newMap.save();
                return response.sendStatus(200);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getMaps', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("usao");
                const maps = (yield MapModel_1.MapModel.find()).map(el => {
                    console.log(this.convertMapToFrontendMap(el));
                    return this.convertMapToFrontendMap(el);
                });
                // const map = maps[maps.length - 1];
                // console.log(map)
                // console.log(JSON.stringify(this.convertMapToFrontendMap(map)));
                // console.log(this.convertFrontendMaptoMap(this.convertMapToFrontendMap(map)));
                return response.status(200).json(maps);
            }
            catch (e) {
                console.log(e);
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getMaps/:creatorName', this.checkAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const maps = (yield MapModel_1.MapModel.find({ creatorUsername: request.params.creatorName })).map(el => {
                    console.log(this.convertMapToFrontendMap(el));
                    return this.convertMapToFrontendMap(el);
                });
                return response.status(200).json(maps);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.get('/getMap/:title', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const map = (yield MapModel_1.MapModel.findOne({ title: request.params.title }));
                if (map == null) {
                    return response.status(404).json({ msg: "Map not found" });
                }
                return response.status(200).json(this.convertMapToFrontendMap(map));
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.post('/addCode', this.checkAuth, (request, response) => {
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
        this.router.get('/getCode/:mapTitle', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const map = yield MapModel_1.MapModel.findOne({ title: request.params.mapTitle });
                if (map == null)
                    return response.status(404).json({ error: "Map not found" });
                let randomCode;
                if (map.debugTask) {
                    let code = yield CodeModel_1.CodeModel.find({ mapTitle: request.params.mapTitle });
                    randomCode = code[Math.floor(Math.random() * code.length)];
                }
                else {
                    randomCode = "const solve = () => {\n\n};";
                }
                return response.status(200).json(randomCode);
            }
            catch (e) {
                return response.status(500).send(e);
            }
        }));
        this.router.put('/rateMap/:title/:grade', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const map = yield MapModel_1.MapModel.find({ title: request.params.title });
                if (map == null)
                    return response.status(404).json({ err: "Map not found" });
                const objMap = map[map.length - 1];
                const grade = parseInt(request.params.grade);
                console.log("Grade ", grade);
                console.log("UserRating ", objMap.userRating);
                console.log("NumOfUseRgRADES ", objMap.numOfUserGrades);
                objMap.userRating = (objMap.userRating * objMap.numOfUserGrades + grade) / (objMap.numOfUserGrades + 1);
                objMap.numOfUserGrades += 1;
                objMap.save();
                return response.status(200).json(objMap);
            }
            catch (err) {
                return response.status(500).json(err);
            }
        }));
        this.router.put('/rateComplicity/:title/:grade', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const map = yield MapModel_1.MapModel.find({ title: request.params.title });
                if (map == null)
                    return response.status(404).json({ err: "Map not found" });
                const objMap = map[map.length - 1];
                const grade = parseInt(request.params.grade);
                console.log("Grade ", grade);
                console.log("UserRating ", objMap.userRating);
                console.log("NumOfUseRgRADES ", objMap.numOfUserGrades);
                objMap.complicityRating = (objMap.complicityRating * objMap.numOfComplicityGrades + grade) / (objMap.numOfComplicityGrades + 1);
                objMap.numOfComplicityGrades += 1;
                objMap.save();
                return response.status(200).json(objMap);
            }
            catch (err) {
                return response.status(500).json(err);
            }
        }));
    }
}
exports.DbController = DbController;
