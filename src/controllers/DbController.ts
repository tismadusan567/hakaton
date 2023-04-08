import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import { CodeModel } from "../models/CodeModel";
import cors from "cors";
import { request } from "http";

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
        console.log("usao");
        const maps = await MapModel.find();

        console.log(typeof maps);

        return response.status(200).json(maps);
      } catch (e) {
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
      try{
        const newCode = new CodeModel(request.body);
        newCode.save();

        return response.sendStatus(200);
      }catch(e){
        return response.status(500).send(e);
      }
    })

    this.router.get('/getCodes', async (request: Request, response: Response) => {
      try{
        const codes = await CodeModel.find();

        return response.status(200).json(codes);
      }catch(e){
        return response.status(500).send(e);
      }
    });

    this.router.get('/getCode/:title', async (request: Request, response: Response) => {
      try{
        const code = await CodeModel.findOne({title: request.params.title});

        return response.status(200).json(code);
      }catch(e){
        return response.status(500).send(e);
      }
    })
  }
}
