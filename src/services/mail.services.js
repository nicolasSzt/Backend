import transporter from "../config/mail.config.js";
import { ENVIRONMENT } from "../../enviroment.js";

export async function sendVerificationEmail({ email, name, redirectUrl }) {
  const result = await transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: email,
    subject: "Verifica tu correo electrónico",
    html: `
      <h1>Bienvenido ${name}</h1>
      <p>
        Necesitamos que des click al siguiente link para verificar que esta es tu cuenta.
        Si no reconoces este registro, desestima este mail.
      </p>
      <a href="${redirectUrl}">Verificar cuenta</a>
      <p>Tienes 7 días para verificar tu cuenta.</p>
    `,
  });

  console.log("Mail enviado:", result);
}
