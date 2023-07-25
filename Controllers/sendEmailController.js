const sendEmail = require("../email_send/mailer");
const emailExistence = require("email-existence");

exports.emailSend = async (req, res) => {
  const { name, email } = req.body;
  const ch = "0123456789";
  var code = "";
  for (let index = 0; index < 4; index++) {
    code += ch[Math.floor(Math.random() * ch.length)];
  }
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "confirmation password",
    html: `<h2>Bonjour ${name} ! </h2>
    
            <h4> Voilà le code de confirmation de votre mot de passe : </h4>

            <h1> ${code}</h1>
    
    `,
  };

  try {
     
    emailExistence.check(email, async (err, response) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send(
            "Une erreur de serveur s'est produite lors de la vérification de l'adresse e-mail."
          );
      }

      if (response) {
        await sendEmail(mailOptions);
        res.status(200).send(`email envoyé avec code : ${code}`);
      } else {
        // L'adresse e-mail n'existe pas
        res.status(400).send("L'adresse e-mail incorrècte !!!");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de l'envoi de l'e-mail.");
  }
};
