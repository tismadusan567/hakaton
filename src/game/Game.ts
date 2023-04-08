import {runInNewContext} from "vm";
import { IMap, MapModel } from "../models/MapModel";

export function runGame(map: IMap, code: string): void{
    console.log(map);

    const a = 5;
    console.log(a);
    const res = runInNewContext("let result = map['levelMap'];result = result;", {map: map});
    console.log(res);
    console.log(typeof res);

    console.log(a);
}
