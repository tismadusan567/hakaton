import { Router } from "express";
import { AppRoute } from "./app-route";
import { DbController } from "../controllers/DbController";
import { GameController } from "../controllers/GameController";
import { AuthController } from "../controllers/AuthController";

export class AppRouting {
    constructor(private route: Router) {
        this.route = route;
        this.configure();
    }

    public configure() {
        this.addRoute(new DbController());
        this.addRoute(new GameController());
        this.addRoute(new AuthController());
    }

    private addRoute(appRoute: AppRoute) {
        this.route.use(appRoute.route, appRoute.router);
    }
}