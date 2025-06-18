const authorizationMiddleware = (request, response, next) => {
  try {
    const authorization_header = request.headers["authorization"];
    const authorization_type = authorization_header.split(" ")[0];
    const authorization_token = authorization_header.split(" ")[1];
    const authorization_token_payload = jwt.verify(
      authorization_token,
      ENVIRONMENT.JWT_SECRET_KEY
    );
    console.log(authorization_token_payload);
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
      response.status(500).json({
        ok: false,
        message: "Error interno del servidor",
        status: 500,
      });
    }
  }
};

export default authorizationMiddleware;
