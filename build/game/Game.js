"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGame = void 0;
const vm_1 = require("vm");
function runGame(map, code) {
    console.log(map);
    const a = 5;
    console.log(a);
    const res = (0, vm_1.runInNewContext)("let result = map['levelMap'];result = result;", { map: map });
    console.log(res);
    console.log(typeof res);
    console.log(a);
}
exports.runGame = runGame;
