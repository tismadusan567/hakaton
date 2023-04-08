"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouting = void 0;
const DbController_1 = require("../controllers/DbController");
const GameController_1 = require("../controllers/GameController");
class AppRouting {
    constructor(route) {
        this.route = route;
        this.route = route;
        this.configure();
    }
    configure() {
        this.addRoute(new DbController_1.DbController());
        this.addRoute(new GameController_1.GameController());
    }
    addRoute(appRoute) {
        this.route.use(appRoute.route, appRoute.router);
    }
}
exports.AppRouting = AppRouting;
