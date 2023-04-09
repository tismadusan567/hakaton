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

    try {

        let data = readFileSync('./src/game/gamecode.js', 'utf8');
        fullCode += data + "\n";

        // data = readFileSync('./src/game/testcode.js', 'utf8');
        // fullCode += data + "\n";

        fullCode += code + "\n";

        data = readFileSync('./src/game/postprocess.js', 'utf8');
        fullCode += data + "\n";
    } catch (err) {
        console.error(err);
    }

    let res = undefined
    let errorMessage = undefined;
    try {
        res = runInNewContext(fullCode, {map: map}, {timeout: 5000});
    } catch (err) {
        errorMessage = (err as Error).stack;
    }

    return {
        commandList: res?.commandList,
        finished: res?.finished,
        error: errorMessage
    }
}
