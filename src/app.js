const express = require("express");
const app = express();
const cors = require("cors");
const transporter = require("./utils/transporter");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const corsOptions = {
  origin: process.env.CORS,
};

app.use(cors(corsOptions));

app.post("/api/contact/send", function (req, res) {
  const { text, subject, name } = req.body

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: process.env.EMAIL_RECEIVER,
      subject: `Mensaje de portfolio - ${subject}`,
      text: `
        Nuevo mensaje desde el formulario de contacto:

        Nombre: ${name}
        Mensaje: ${text}`,
    },
    function (error, info) {
      if (error) {
        console.error("Error al enviar el correo:", error);
        return res
          .status(500)
          .json({ message: "Error al enviar el correo", error });
      } else {
        console.log("Correo enviado:", info.response);
        return res
          .status(200)
          .json({ message: "Correo enviado correctamente", info });
      }
    }
  );
});

module.exports = app;
