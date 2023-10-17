import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
export class Password {
  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    providedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const comparedHashedPassword = (await promisify(scrypt)(
      providedPassword,
      salt,
      64
    )) as Buffer;

    return hashedPassword === comparedHashedPassword.toString("hex");
  }
}
