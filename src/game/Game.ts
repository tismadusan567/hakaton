import {runInNewContext} from "vm";
import { IMap, MapModel } from "../models/MapModel";
import { readFileSync } from "fs";

interface IGameResult {
    
}

export function runGame(map: IMap, code: string): void{
    let fullCode = "";

    let testMap = {
        title: 'Cool first level',
        description: 'Easy first level for dummies',
        width: 3,
        height: 3,
        complicityRating: 4,
        userRating: 3,
        levelMap: [
          {
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
          },
        ],
        __v: 0
    };

    try {

        let data = readFileSync('./src/game/gamecode.js', 'utf8');
        fullCode += data + "\n";

        data = readFileSync('./src/game/testcode.js', 'utf8');
        fullCode += data + "\n";

        data = readFileSync('./src/game/postprocess.js', 'utf8');
        fullCode += data + "\n";
    } catch (err) {
        console.error(err);
    }

    const res = runInNewContext(fullCode, {map: testMap});
    console.log(res);

    return res;
}
