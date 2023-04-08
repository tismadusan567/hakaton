import {runInNewContext} from "vm";
import { IMap, MapModel } from "../models/MapModel";
import { readFileSync } from "fs";

export enum CommandType {
    walkCommand = 0,
    teleportCommand = 1
}

export interface ICommand {
    type: CommandType;
    x: number;
    y: number;
}

export interface IGameResult {
    commandList?: ICommand[];
    finished?: boolean;
    error?: string;
}

//uradi check da li jer error polje u gameresultu undefined, ako nije doslo je do greske
export function runGame(map: IMap, code: string): IGameResult {
    let fullCode = "";

    //proveri dal treba da se skloni objectId iz mape
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

    let res = undefined
    let errorMessage = undefined;
    try {
        res = runInNewContext(fullCode, {map: testMap});
    } catch (err) {
        errorMessage = (err as Error).stack;
    }

    return {
        commandList: res?.commandList,
        finished: res?.finished,
        error: errorMessage
    }
}
