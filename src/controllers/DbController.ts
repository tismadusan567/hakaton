import { Router, Request, Response } from "express";
import { AppRoute } from "../router/app-route";
import { MapModel } from '../models/MapModel';
import { CodeModel } from "../models/CodeModel";
import cors from "cors";
import jwt from "jsonwebtoken";

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

    this.router.post('/createMap', this.checkAuth, async (request: Request, response: Response) => {
      try {
        const checkMap = await MapModel.find({ title: request.body.title });

        if (checkMap)
          return response.status(400).json({ msg: "Map with that title already exists" });

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

    this.router.get('/getCode/:mapTitle', async (request: Request, response: Response) => {
      try {
        const code = await CodeModel.find({ mapTitle: request.params.mapTitle });

        const randomCode = code[Math.floor(Math.random() * code.length)];

        return response.status(200).json(randomCode);
      } catch (e) {
        return response.status(500).send(e);
      }
    });

    this.router.put('/rateMap/:title/:grade', async (request: Request, response: Response) => {
      try {
        const map = await MapModel.find({ title: request.params.title });

        if (map == null)
          return response.status(404).json({ err: "Map not found" });

        const objMap = map[map.length - 1];

        const grade: number = parseInt(request.params.grade);

        console.log("Grade ", grade);
        console.log("UserRating ", objMap.userRating);
        console.log("NumOfUseRgRADES ", objMap.numOfUserGrades);

        objMap.userRating = (objMap.userRating * objMap.numOfUserGrades + grade) / (objMap.numOfUserGrades + 1);

        objMap.numOfUserGrades += 1;

        objMap.save();

        return response.status(200).json(objMap);
      } catch (err) {
        return response.status(500).json(err);
      }
    });

    this.router.put('/rateComplicity/:title/:grade', async (request: Request, response: Response) => {
      try {
        const map = await MapModel.find({ title: request.params.title });

        if (map == null)
          return response.status(404).json({ err: "Map not found" });

        const objMap = map[map.length - 1];

        const grade: number = parseInt(request.params.grade);

        console.log("Grade ", grade);
        console.log("UserRating ", objMap.userRating);
        console.log("NumOfUseRgRADES ", objMap.numOfUserGrades);

        objMap.complicityRating = (objMap.complicityRating * objMap.numOfComplicityGrades + grade) / (objMap.numOfComplicityGrades + 1);

        objMap.numOfComplicityGrades += 1;

        objMap.save();

        return response.status(200).json(objMap);
      } catch (err) {
        return response.status(500).json(err);
      }
    });
  }
}
