import { Resend } from "resend";
import Contact from "../models/contact.model.js";
const resend = new Resend("re_9E8Xfuo7_3DnxvCJQ5MHMLo8QXeSK68NH");

const submitContactForm = async (req, res) => {
    const { email, name, message } = req.body;

    try {
        const newContact = new Contact({
            email,
            name,
            message,
        });

        await newContact.save();
        const emailTemplate = `
<html>
<head>
    <style>
        section {
            background-color: #faf8f4;
            color: #6e5137;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            width: 100%;
        }
    </style>
</head>
<body>
    <section>
    <h1>Recibiste un nuevo mensaje</h1>
    <h3>Detalles del mensaje de contacto:</h3>
    <ul>
        <li><strong>Mail:</strong> ${email} </li>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Mensaje:</strong> ${message}</li>
    </ul>
    </section>
</body>
</html>
`;
        resend.emails.send({
            from: "onboarding@resend.dev",
            to: "codescapehotel@gmail.com",
            subject: "Nuevo mensaje de contacto",
            html: emailTemplate,
        });
        res
            .status(200)
            .json({ message: "Mensaje recibido y guardado en la base de datos" });
    } catch (error) {
        console.error("Error al guardar en la base de datos:", error);
        res.status(500).json({ message: "Error al procesar el formulario" });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({ message: "Error al obtener los contactos" });
    }
};
export { submitContactForm, getContacts };
