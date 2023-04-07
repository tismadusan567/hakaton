"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouting = void 0;
const DbController_1 = require("../controllers/DbController");
class AppRouting {
    constructor(route) {
        this.route = route;
        this.route = route;
        this.configure();
    }
    configure() {
        this.addRoute(new DbController_1.DbController());
    }
    addRoute(appRoute) {
        this.route.use(appRoute.route, appRoute.router);
    }
}
exports.AppRouting = AppRouting;
