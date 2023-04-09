import express, { Request, Response, NextFunction } from 'express';
import * as http from "http";
import { json, urlencoded } from "body-parser";
import { AppRouting } from './router/app-routing';
import mongoose from 'mongoose';
import { IMap, MapModel } from './models/MapModel';
import { CodeModel } from './models/CodeModel';
import { UserModel } from './models/UserModel';

const path = require("path");
require('dotenv').config();

export class Server {
    public app: express.Express;
    private router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.configure();
    }

    private configure() {
        this.configureMiddleware();
        this.configureRoutes();
        this.configureDb();
        this.insertDummies();
        this.readDummies().catch(err => console.log(err));
    }

    private configureMiddleware() {
        this.app.use(json({ limit: "50mb" }));
        this.app.use(urlencoded({ limit: "50mb", extended: true }));
    }

    private configureRoutes() {
        const basePath = "/";
        this.app.use(basePath, this.router);
        // if (process.env.NODE_ENV == "production") {
        //     this.app.use(express.static(path.join(__dirname, '/../client/build')));
        // }
        new AppRouting(this.router);
    }

    private insertDummies() {
        const map = new MapModel({
            title: 'Cool first level',
            description: 'Easy first level for dummies',
            width: 3,
            height: 3,
            complicityRating: 4,
            userRating: 3,
            numOfUserGrades: 1,
            numOfComplicityGrades: 1,
            levelMap: []
        });

        

        map.levelMap.push({
            type: 2,
            portalCoordinate: 3,
          },
          {
            type: 3,
            portalCoordinate: 7,
          },
          {
            type: 0,
            portalCoordinate: 3,
          },
          {
            type: 0,
            portalCoordinate: 3,
          },
          {
            type: 0,
            portalCoordinate: 3,
          },
          {
            type: 0,
            portalCoordinate: 3,
          },
          {
            type: 0,
            portalCoordinate: 3,
          },
          {
            type: 3,
            portalCoordinate: 1,
          },
          {
            type: 4,
            portalCoordinate: 3,
          });

        map.save();

        const code = new CodeModel({
            title: "Python problem 5",
            problemDescription: "Find python error",
            sourceCode: "def main(): time.sleep(30)",
            complicity: 1,
            userRating: 2,
            creatorUsername: "tisma",
            mapTitle: "Cool first level",
            hints: []
        });

        code.hints.push(
            {
                hint: "Try looking at the includes"
            },
            {
                hint: "Take a look at the line 154"
            }
        );

        code.save();

        const user = new UserModel({
            firstName: "Dusan",
            lastname: "Tisma",
            email: "dusantisma123@gmail.com",
            password: "$2a$10$K07Hs4CHu5qAFiTTkZDANOxSyLaSOoyn./bn4Zdq9toDXxMD6t49q",
            username: "dtisma2021"
        });

        user.save();
    }

    private async readDummies() {
        const el: IMap | null = await MapModel.findOne({ height: 10 });
        console.log(el);
    }

    private configureDb() {
        // const db_url: string = process.env.DB_URL ?? "bruh";
        const db_url: string = "mongodb+srv://vnikolic7821rn:frlqAT5jTsmTdZut@cluster0.dj5ugyr.mongodb.net/?retryWrites=true&w=majority";
        console.log(db_url);
        mongoose.connect(db_url);

        const flag = mongoose.connection;

        flag.once('open', () => {
            console.log("Database connection established succesfully!");
        });
    }

    public run() {
        const port = process.env.PORT || 31337;
        const server = http.createServer(this.app);
        server.listen(port, () => {
            console.log(`Express server running on port ${port}.`);
        });
    }
}