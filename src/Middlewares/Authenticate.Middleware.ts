import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from '../Config/Secure';
import { JWTContainerType } from '../Core/Types/JWTContainer.Type';
import { generateToken } from '../Core/Helpers/JWT';
import { Logger } from '../Core/Modules/Logger';

export function authenticate(req: Request, res: Response, next: Function) {
  const accessToken = req.header('Authorization');

  if (!accessToken) {
    Logger.Warn("No token provided", "Authenticate")
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, SECRET_KEY, ((err, decoded: JWTContainerType) => {
    if (err) {
      Logger.Warn(err.message, "Authenticate")
      return res.sendStatus(401);
    }

    if (decoded.exp * 1000 < new Date().getTime()) {
      Logger.Warn("Expired Token", "Authenticate")
      return res.sendStatus(401);
    }

    req.id = decoded.id;
    req.username = decoded.username;
    next();
  }));
}
