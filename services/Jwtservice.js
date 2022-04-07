import { JWT_SECRET } from "../config";
import jsonwebtoken from "jsonwebtoken";

class Jwtservice {
  static sign(payload, expiry = "1y", secret = JWT_SECRET) {
    return jsonwebtoken.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_SECRET) {
    return jsonwebtoken.verify(token, secret);
  }
}

export default Jwtservice;
