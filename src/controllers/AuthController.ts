import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import { runGame } from "../game/Game";
import { CodeModel } from "../models/CodeModel";
import { UserModel } from "../models/UserModel";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class AuthController implements AppRoute {
    public route: string = "/auth";
    router: Router = Router();

    constructor() {
        this.router.use(cors({ origin: "*" }));

        this.router.post('/register', (request: Request, response: Response) => {
            try {

                const data = {
                    username: request.body.username,
                    password: bcrypt.hashSync(request.body.password, 10),
                    firstName: request.body.firstName,
                    lastname: request.body.lastname,
                    email: request.body.email
                };

                const newUser = new UserModel(data);
                newUser.save();

                return response.sendStatus(200);
            } catch (e) {
                return response.status(500).send(e);
            }
        });

        this.router.post('/login', async (request: Request, response: Response) => {
            try {
                const user = await UserModel.findOne({ username: request.body.username });

                if (user == null)
                    return response.status(500);

                if (bcrypt.compareSync(request.body.password, user.password)) {
                    const obj = {
                        user: user.username
                    };

                    const token = jwt.sign(obj, "wb6UxoNuoMb49hkqdqkXQqwQmSQsRlu6l8TczU1I3YoBXsHW6R8mqETCOKaCQswU");

                    return response.json({ token: token });
                } else {
                    response.status(400).json({ msg: "Invalid credentials" });
                }
            } catch (e) {
                return response.status(500).send(e);
            }
        });

        this.router.get('/getMaps', async (request: Request, response: Response) => {
            try {
                console.log("usao");
                const maps = await MapModel.find();

                console.log(typeof maps);
                runGame(maps[0], "");


                return response.status(200).json(maps);
            } catch (e) {
                console.log(e);
                return response.status(500).send(e);
            }
        });

        this.router.get('/getMap/:title', async (request: Request, response: Response) => {
            try {
                const map = await MapModel.findOne({ title: request.params.title });

                console.log(map);

                return response.status(200).json(map);
            } catch (e) {
                return response.status(500).send(e);
            }
        });

        this.router.post('/addCode', (request: Request, response: Response) => {
            try {
                const newCode = new CodeModel(request.body);
                newCode.save();

                return response.sendStatus(200);
            } catch (e) {
                return response.status(500).send(e);
            }
        })

        this.router.get('/getCodes', async (request: Request, response: Response) => {
            try {
                const codes = await CodeModel.find();

                return response.status(200).json(codes);
            } catch (e) {
                return response.status(500).send(e);
            }
        });

        this.router.get('/getCode/:title', async (request: Request, response: Response) => {
            try {
                const code = await CodeModel.findOne({ title: request.params.title });

                return response.status(200).json(code);
            } catch (e) {
                return response.status(500).send(e);
            }
        });
    }
}
