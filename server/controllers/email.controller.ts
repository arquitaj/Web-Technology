import nodemailer from "nodemailer";

export const sendEmailNotification = async (to: string[], subject: string, text: string) => {
    try {
      console.log("I am being access!");
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // your SMTP host
            port: Number(process.env.SMTP_PORT),
            secure: false, // true if port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
              rejectUnauthorized: false, // allow self-signed certificates
            },
        });

        await transporter.sendMail({
            from: `"AIMS System" <no-reply@example.com>`,
            to: to.join(", "),
            subject,
            text
        });

        console.log("Email sent to:", to);
        return true;
    } catch (error) {
        console.error("Email sending failed: ", error);
        return false;
    }
};