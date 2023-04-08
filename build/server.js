"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const body_parser_1 = require("body-parser");
const app_routing_1 = require("./router/app-routing");
const mongoose_1 = __importDefault(require("mongoose"));
const MapModel_1 = require("./models/MapModel");
const path = require("path");
require('dotenv').config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = express_1.default.Router();
        this.configure();
    }
    configure() {
        this.configureMiddleware();
        this.configureRoutes();
        this.configureDb();
        this.insertDummies();
        this.readDummies().catch(err => console.log(err));
    }
    configureMiddleware() {
        this.app.use((0, body_parser_1.json)({ limit: "50mb" }));
        this.app.use((0, body_parser_1.urlencoded)({ limit: "50mb", extended: true }));
    }
    configureRoutes() {
        const basePath = "/";
        this.app.use(basePath, this.router);
        // if (process.env.NODE_ENV == "production") {
        //     this.app.use(express.static(path.join(__dirname, '/../client/build')));
        // }
        new app_routing_1.AppRouting(this.router);
    }
    insertDummies() {
        const map = new MapModel_1.MapModel({
            width: 10,
            height: 10,
            complicityRating: 4,
            userRating: 3,
            levelMap: []
        });
        map.levelMap.push({
            type: 1,
            portalCoordinate: 3
        }, {
            type: 1,
            portalCoordinate: 2
        });
        map.save();
    }
    readDummies() {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield MapModel_1.MapModel.findOne({ height: 10 });
            console.log(el);
        });
    }
    configureDb() {
        // const db_url: string = process.env.DB_URL ?? "bruh";
        const db_url = "mongodb+srv://vnikolic7821rn:frlqAT5jTsmTdZut@cluster0.dj5ugyr.mongodb.net/?retryWrites=true&w=majority";
        console.log(db_url);
        mongoose_1.default.connect(db_url);
        const flag = mongoose_1.default.connection;
        flag.once('open', () => {
            console.log("Database connection established succesfully!");
        });
    }
    run() {
        const port = process.env.PORT || 4000;
        const server = http.createServer(this.app);
        server.listen(port, () => {
            console.log(`Express server running on port ${port}.`);
        });
    }
}
exports.Server = Server;
