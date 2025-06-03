import userRepository from "../repositories/user_repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "../../enviroment.js";

class UserController {
  async create(request, response) {
    console.log("Body:", request.body);

    await userRepository.create({
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
    });
    response.send("Recibido!!");
  }

  sendVerificationEmail = async ({ email, name, redirectUrl }) => {
    const result = await transporter.sendMail({
      from: ENVIRONMENT.GMAIL_USERNAME,
      to: email,
      subject: "Verifica tu correo electronico",
      html: `
            <h1>Bienvenido ${name}</h1>
            <p>
                Necesitamos que des click al siguiente link para verificar que esta es tu cuenta, en caso de no reconocer este registro desestima el mail.
            </p>
            <a href="${redirectUrl}">Verificar cuenta</a>
            <span> Tienes 7 dias para dar click al link<span/>
            `,
    });
    console.log("Mail enviado:", result);
  };

  async registrer(request, response) {
    try {
      if (
        !request.body ||
        !request.body.name ||
        !request.body.password ||
        !request.body.email
      ) {
        response.status(400).send({
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
        "clave_super_secreta123_nadie_la_conoce"
      );

      await sendVerificationEmail({
        email: request.body.email,
        name: request.body.name,
        redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verification_token}`,
      });

      response.send({
        ok: true,
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response.status(error.status).send({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async getAll(request, response) {
    response.send(userRepository.getAll());
  }

  async verify(request, response) {
    try {
      const verificationToken = request.query.verify_token;

      if (!verificationToken) {
        response.status(400).send({
          ok: false,
          messages: "Donde esta el token de verificacion",
        });

        return;
      }

      const content = jwt.verify(verificationToken, ENVIRONMENT.JWT_SECRET_KEY);

      await userRepository.verifyUserEmail({ email: content.email });
      response.send({
        ok: true,
        message: "Usuario encontrado con exito",
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response.status(error.status).send({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
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
        throw { status: 400, message: "Usuario no verificado" };
      }

      const is_same_password = await bcrypt.compare(password, user.password);

      if (!is_same_password) {
        throw { status: 400, message: "Contrasenia no es valida" };
      }

      const authorization_token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
        ENVIRONMENT.JWT_SECRET_KEY
      );

      response.send({
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
        response.status(error.status).send({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
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
          redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verification_token}`,
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
