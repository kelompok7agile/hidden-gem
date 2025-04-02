const supabase = require("../config/database.js");
const { findUserByEmail } = require("../repositories/userRepository.js");
const { sendResetPassword } = require("../utils/emailUtils.js");
const { formatMessage } = require("../utils/formatter.js");
const { generateResetToken, verifyResetToken} = require("../utils/tokenUtils.js");

// memastikan email yang masuk untuk reset password adalah email terdaftar
const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json(formatMessage("Email tidak terdaftar", null, 404));
    }
    // generate reset token
    const resetToken = generateResetToken(email);
    const resetLink = `https://your-app.com/reset-password?token=${resetToken}`;

    const emailResult = await sendResetPassword(email, resetLink);
    if (!emailResult.success) {
      return res
        .status(500)
        .json(formatMessage("Gagal mengirimkan email", null, 500));
    }
    res
      .status(200)
      .json(formatMessage("Pesan email reset password telah dikirim", null));
  } catch (error) {
    console.error("kesalahan saat meminta reset password", errorMessage);
    res
      .status(500)
      .json(
        formatMessage(
          "Terjadi kesalahan saat meminta reset password",
          null,
          500
        )
      );
  }
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // verifikasi token
  const decoded = verifyResetToken(token);
  if (!decoded) {
    return res.status(400).json(formatMessage("Token tidak valid", null, 400));
  }

  const { email } = decoded;

  // update password di database
  const { error } = await supabase
    .from("user")
    .update({ password: newPassword })
    .eq("email: ", email);

  if (error) {
    return res.status(500).json(formatMessage("gagal mengganti password", null, 500));
  }

  res.status(200).json(formatMessage("password berhasil diganti"));
};

module.exports = { requestResetPassword, resetPassword };
