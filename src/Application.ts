import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Logger } from "./Core/Modules/Logger";
import { Router } from "./Router";
import "./Core/Helpers/Extensions"
import "./Core/Modules/Injector"

export class Application {
  private _express: express.Application;
  private _router: Router;

  constructor() {
    this.SetupDefaults();
  }

  private ImplementMembers(): void {
    this._express = express();
    this._router = new Router(this._express);
  }

  private SetupDefaults(): void {
    this.ImplementMembers();
    this.SetupConfigs();
    this.SetupRouteConfigs();
  }

  private SetupConfigs(): void {
    this._express.use(cors({
      origin: 'http://localhost:4200'
    }));
    this._express.use(bodyParser.json({strict: true}));
    this._express.use(bodyParser.urlencoded({extended: false}));
    this._express.use(express.static(path.join(__dirname, "Public")));

    this._express.use(cookieParser());
    this._express.disable("x-powered-by");
  }

  private SetupRouteConfigs(): void {
    this._router.Route();
  }

  public Listen(port: number): void {
    this._express.listen(port, () => Logger.Info("Server is running at port: " + port, "APPLICATION"));
  }
}
