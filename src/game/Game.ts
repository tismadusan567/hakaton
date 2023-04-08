import {runInThisContext} from "vm";
import { IMap, MapModel } from "../models/MapModel";

export function runGame(map: IMap, code: string): void{
    runInThisContext("console.log(map)");
    // console.log(result);
}
