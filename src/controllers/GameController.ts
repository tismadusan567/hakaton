import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import cors from "cors";

export class GameController implements AppRoute {
    public route: string = "/game";
    router: Router = Router();

    constructor() {
        this.router.use(cors({ origin: "*" }))

        this.router.get('/check', (request: Request, response: Response) => {
            try {
                const code: String = request.body;

                console.log(code);

                // do the game checking logic
                return response.status(200).json({ msg: "Sve okej" });
            } catch (e) {
                return response.status(500).send(e);
            }
        });
    }
}