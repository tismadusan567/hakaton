import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import { runGame } from "../game/Game";
import { CodeModel } from "../models/CodeModel";
import cors from "cors";
import jwt from "jsonwebtoken";
import { request } from "http";

interface User {
  user: String;
}

export class DbController implements AppRoute {
  public route: string = "/db";
  router: Router = Router();

  private checkAuth(req: Request, res: Response, next: Function) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: "Check auth failed" });

    jwt.verify(token, "wb6UxoNuoMb49hkqdqkXQqwQmSQsRlu6l8TczU1I3YoBXsHW6R8mqETCOKaCQswU", (err, user) => {
      if (err) return res.status(403).json({ msg: err });

      const obj = user as User;

      console.log("Parsed ", obj);

      req.body.creatorUsername = obj.user as String;

      console.log(req.body.username);

      next();
    });
  }

  constructor() {
    this.router.use(cors({ origin: "*" }));

    this.router.post('/createMap', this.checkAuth, (request: Request, response: Response) => {
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

        const res = runGame(maps[0], "");
        console.log(res);


        return response.status(200).json(maps);
      } catch (e) {
        console.log(e);
        return response.status(500).send(e);
      }
    });

    this.router.get('/getMaps/:creatorName', this.checkAuth, async (request: Request, response: Response) => {
      try {
        const maps = await MapModel.find({ creatorUsername: request.params.creatorName });

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

    this.router.post('/addCode', this.checkAuth, (request: Request, response: Response) => {
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
    })
  }
}
