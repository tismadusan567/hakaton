import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import { runGame } from "../game/Game";
import cors from "cors";

export class DbController implements AppRoute {
  public route: string = "/db";
  router: Router = Router();

  constructor() {
    this.router.use(cors({ origin: "*" }));

    this.router.post('/createMap', (request: Request, response: Response) => {
      try {
        const newMap = new MapModel(request.body);
        newMap.save();

        return response.sendStatus(200);
      } catch (e) {
        return response.status(500).send(e);
      }
    });

    this.router.get('/getMaps', async (request: Request, response: Response) => {
      try {
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
      try{
        const map = await MapModel.findOne({title: request.params.title});

        console.log(map);
        
        return response.status(200).json(map);
      }catch(e){
        return response.status(500).send(e);
      }
    });
  }
}
