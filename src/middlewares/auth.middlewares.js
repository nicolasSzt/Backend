import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "../../enviroment.js";

const authorizationMiddleware = (request, response, next) => {
  try {
    const authorization_header = request.headers["authorization"];
    const authorization_type = authorization_header.split(" ")[0];
    const authorization_token = authorization_header.split(" ")[1];
    const authorization_token_payload = jwt.verify(
      authorization_token,
      ENVIRONMENT.JWT_SECRET_KEY
    );
    request.user = authorization_token_payload;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      response.status(401).json({
        ok: false,
        message: "Token invalido",
        status: 401,
      });
    } else {
      console.log(error)
      response.status(500).json({
        ok: false,
        message: "Error interno del servidor",
        status: 500,
      });
    }
  }
};

export default authorizationMiddleware;
