import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import cors from "cors";
import { runGame } from "../game/Game";

export class GameController implements AppRoute {
    public route: string = "/game";
    router: Router = Router();

    constructor() {
        this.router.use(cors({ origin: "*" }))

        this.router.post('/check', async (request: Request, response: Response) => {
            try {
                const code: string = request.body.source;
                const map = await MapModel.findOne({ title: request.body.title });
                if (map == null) {
                    return response.status(404).json({msg: "Map not found"})
                }

                console.log(code);
                const res = runGame(map, code);

                // do the game checking logic
                return response.status(200).json(res);
            } catch (e) {
                return response.status(500).send(e);
            }
        });
    }
}