import userRepository from "../repositories/user_repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/mail.services.js";
import ApiResponse from "../utils/apiResponse.js";
import { ENVIRONMENT } from "../../enviroment.js";

class UserController {
  async create(request, response) {
    console.log("Body:", request.body);

    await userRepository.create({
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
    });
    response.json("Recibido!!");
  }
  async register(request, response) {
    try {
      if (
        !request.body ||
        !request.body.name ||
        !request.body.password ||
        !request.body.email
      ) {
        response.status(400).json({
          message: "Registro invalido",
          ok: false,
        });
      }

      const password_hased = await bcrypt.hash(request.body.password, 12);

      await userRepository.create({
        name: request.body.name,
        password: password_hased,
        email: request.body.email,
      });

      const verification_token = jwt.sign(
        { email: request.body.email },
        ENVIRONMENT.JWT_SECRET_KEY
      );

      await sendVerificationEmail({
        email: request.body.email,
        name: request.body.name,
        redirectUrl: `${ENVIRONMENT.CLIENT_URL}/verify?verify_token=${verification_token}`,
      });
      response.json({
        ok: true,
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response.status(error.status).json({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .json({ message: "Error interno del servidor", ok: false });
      }
    }
  }
  async getAll(request, response) {
    const apiResponse = new ApiResponse(response);

    try {
      const users = await userRepository.getAllUsers();
      console.log("users", users);
      apiResponse.success("Users retrieved successfully", { users });
    } catch (error) {
      console.error("Error retrieving users:", error);
      apiResponse.error("Error retrieving users");
    }
  }

  async verify(request, response) {
    try {
      const verificationToken = request.query.verify_token;

      if (!verificationToken) {
        response.status(400).json({
          ok: false,
          messages: "Donde esta el token de verificacion",
        });

        return;
      }

      const content = jwt.verify(verificationToken, ENVIRONMENT.JWT_SECRET_KEY);
      console.log("content", content);

      await userRepository.verifyUserEmail({ email: content.email });

      response.json({
        ok: true,
        message: "Usuario encontrado con exito",
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response.status(error.status).json({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .json({ message: "Error interno del servidor", ok: false });
      }
    }
  }
  async login(request, response) {
    try {
      const { email, password } = request.body;
      const user = await userRepository.findByEmail({ email });

      if (!email) {
        throw { status: 400, message: "no hay mail" };
      }

      if (!password) {
        throw { status: 400, message: "no hay password" };
      }

      if (!user) {
        throw { status: 400, message: "Usuario no encontrado" };
      }

      if (!user.verified) {
        throw { status: 403, message: "Usuario no verificado" };
      }

      const is_same_password = await bcrypt.compare(password, user.password);

      if (!is_same_password) {
        throw { status: 400, message: "Contrasenia no es valida" };
      }

      const authorization_token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.created_at,
        },
        ENVIRONMENT.JWT_SECRET_KEY
      );

      response.json({
        ok: true,
        status: 200,
        message: "Usuario logueado",
        data: {
          authorization_token: authorization_token,
        },
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response.status(error.status).json({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .json({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async resendVerificationEmail(request, response) {
    try {
      const { email } = request.body;
      const user = await userRepository.findByEmail({ email });

      if (!user) {
        throw {
          status: 404,
          message: "usario no encontrado",
        };
      } else {
        const verification_token = jwt.sign(
          { email: email },
          ENVIRONMENT.JWT_SECRET_KEY
        );
        await sendVerificationEmail({
          email,
          name: user.name,
          redirect_url: `${ENVIRONMENT.CLIENT_URL}/api/users/verify?verify_token=${verification_token}`,
        });
        response.send({
          ok: true,
          message: "mail reenviado  con exito",
          status: 200,
        });
      }
    } catch (error) {
      if (error.status) {
        response.status(error.status).send({
          message: error.message,
          ok: false,
        });
      }
    }
  }
}

const userController = new UserController();

export default userController;
