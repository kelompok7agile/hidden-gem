const nodemailer = require ("nodemailer");

const sendResetPassword = async (toEmail, resetLink) => {
    try{
        const transporter = nodemailer.createTransport({
            service : '',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS_USER,
            },
        });

        const mailOptions = {
            from: '"Ini nama Aplikasi" <HiddenGemSupport@example.com>',
            to: toEmail,
            subject: 'Reset Password',
            html: `
                <p>Hallo,</p>
                <p>Kami menerima permintaan untuk mereset password Anda.</p>
                <p>Klik link berikut untuk mereset password Anda:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
                <p>Terima kasih,</p>
                <p>Tim Support Hidden Gem</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: "+info.response);
        return { success: true, message: "success to send email"}
    } catch (error){
        console.error("Error sending email: ", error);
        return { success: false, message: "failed to send email"}
    }
}

module.exports = { sendResetPassword }