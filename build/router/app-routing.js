"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouting = void 0;
class AppRouting {
    constructor(route) {
        this.route = route;
        this.route = route;
        this.configure();
    }
    configure() {
        // this.addRoute(new DbController());
    }
    addRoute(appRoute) {
        this.route.use(appRoute.route, appRoute.router);
    }
}
exports.AppRouting = AppRouting;
