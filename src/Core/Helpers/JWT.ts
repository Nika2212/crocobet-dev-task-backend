import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from '../../Config/Secure';

export function generateToken(id: string, username: string): string {
  return jwt.sign({
    id: id,
    username: username
  }, SECRET_KEY, {expiresIn: "1h"})
}
