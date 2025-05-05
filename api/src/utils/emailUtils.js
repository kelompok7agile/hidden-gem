const nodemailer = require ("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendResetPassword = async (toEmail, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            },
        });

        const mailOptions = {
            from: `"HiddenGem" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: '🔐 Reset Password Anda',
            html: `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <tr>
                        <td style="padding: 30px 20px; text-align: center;">
                            <img src="https://i.pinimg.com/736x/6e/e4/c3/6ee4c317e87c64aa326b4cc9cb839329.jpg" alt="HiddenGem Logo" style="max-width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                            <h2 style="color: #333; margin-bottom: 20px;">Permintaan Reset Password</h2>
                            <p style="color: #555; font-size: 16px; line-height: 1.6;">
                                Halo, kami menerima permintaan untuk mereset kata sandi akun Anda.
                            </p>
                            <p style="color: #555; font-size: 16px; line-height: 1.6;">
                                Silakan klik tombol di bawah ini untuk mengatur ulang kata sandi:
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetLink}" 
                                   style="display: inline-block; padding: 14px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="color: #888; font-size: 14px; line-height: 1.5;">
                                ⚠️ Tautan ini akan kedaluwarsa dalam 1 jam. Jika Anda tidak meminta perubahan ini, abaikan email ini.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; font-size: 14px; color: #999; text-align: center;">
                            <p>© 2025 HiddenGem. All rights reserved.</p>
                            <p>Jika Anda memiliki pertanyaan, silakan hubungi kami di <a href="mailto:support@hidden_gem.com" style="color: #007bff; text-decoration: underline;">support@hidden_gem.com</a></p>
                        </td>
                    </tr>
                </table>
            `,
            text: `Permintaan Reset Password\n\nHalo, kami menerima permintaan untuk mereset kata sandi akun Anda.\n\nSilakan klik tautan berikut untuk mengatur ulang:\n${resetLink}\n\nTautan ini akan kedaluwarsa dalam 1 jam. Jika Anda tidak meminta perubahan ini, abaikan email ini.\n\nTim Support HiddenGem`
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: "Success sending password reset email" };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, message: "Failed to send password reset email" };
    }
};

module.exports = { sendResetPassword }