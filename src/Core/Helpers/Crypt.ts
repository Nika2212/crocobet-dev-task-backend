import * as bcrypt from "bcryptjs";
import { Logger } from '../Modules/Logger';

export function encrypt(str: string): string {
  try {
    return bcrypt.hashSync(str, 12);
  } catch (e) {
    Logger.Error(e, "ENCRYPT");
  }
}

export function decrypt(str: string, compareHash: string): boolean {
  try {
    return bcrypt.compareSync(str, compareHash)
  } catch (e) {
    Logger.Error(e, "DECRYPT");
  }
}
