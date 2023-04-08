"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGame = exports.CommandType = void 0;
const vm_1 = require("vm");
const fs_1 = require("fs");
var CommandType;
(function (CommandType) {
    CommandType[CommandType["walkCommand"] = 0] = "walkCommand";
    CommandType[CommandType["teleportCommand"] = 1] = "teleportCommand";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
//uradi check da li jer error polje u gameresultu undefined, ako nije doslo je do greske
function runGame(map, code) {
    let fullCode = "";
    //proveri dal treba da se skloni objectId iz mape
    try {
        let data = (0, fs_1.readFileSync)('./src/game/gamecode.js', 'utf8');
        fullCode += data + "\n";
        // data = readFileSync('./src/game/testcode.js', 'utf8');
        // fullCode += data + "\n";
        fullCode += code + "\n";
        data = (0, fs_1.readFileSync)('./src/game/postprocess.js', 'utf8');
        fullCode += data + "\n";
    }
    catch (err) {
        console.error(err);
    }
    let res = undefined;
    let errorMessage = undefined;
    try {
        res = (0, vm_1.runInNewContext)(fullCode, { map: map });
    }
    catch (err) {
        errorMessage = err.stack;
    }
    return {
        commandList: res === null || res === void 0 ? void 0 : res.commandList,
        finished: res === null || res === void 0 ? void 0 : res.finished,
        error: errorMessage
    };
}
exports.runGame = runGame;
