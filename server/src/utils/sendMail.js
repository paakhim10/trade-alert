// sendConfirmationMail.js
import transporter from "../config/mailer.js";
import fs from "fs/promises";
import path from "path";

const SERVER_URL = process.env.SERVER_URL;
const FROM_EMAIL = process.env.EMAIL_APP_PASSWORD;

export async function sendConfirmationMail(email, userId) {
  const confirmationUrl = `${SERVER_URL}/api/v1/auth/confirmEmail?id=${userId}`;

  try {
    // Read the HTML template file
    const templatePath = path.join(
      path.resolve(),
      "src",
      "templates",
      "confirmEmailTemplate.html"
    );
    let htmlContent = await fs.readFile(templatePath, "utf-8");

    // Replace placeholders with actual data
    htmlContent = htmlContent.replace("{{confirmationUrl}}", confirmationUrl);

    const mailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: "Confirm Your Email Address",
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
