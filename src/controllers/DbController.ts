import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
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

    this.router.get('/getMaps', (request: Request, response: Response) => {
      try{
        
      }catch(e){
        return response.status(500).send(e);
      }
    });
  }
}
