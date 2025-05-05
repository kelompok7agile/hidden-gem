const supabase = require("../config/database.js");
const { findUserByEmail } = require("../repositories/userRepository.js");
const { sendResetPassword } = require("../utils/emailUtils.js");
const { formatMessage } = require("../utils/formatter.js");
const { generateResetToken, verifyResetToken, revokeToken} = require("../utils/tokenUtils.js");
const { hashPassword, comparePassword } = require("../utils/hashPassword.js");
require("dotenv").config();

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json(formatMessage("Email tidak terdaftar", null, 404));
    }
    const resetToken = generateResetToken(email);
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

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
  
  const decoded = await verifyResetToken(token);
  
  if (!decoded) {
    return res.status(400).json(formatMessage("Token tidak valid atau telah dibatalkan", null, 400));
  }

  const { email } = decoded;

  const { hashedPassword, salt } = await hashPassword(newPassword);

  const { error } = await supabase
    .from("user")
    .update({ password: hashedPassword, salt_password: salt })
    .eq("email", email);

  if (error) {
    return res.status(500).json(formatMessage("Gagal Mengubah password", null, 500));
  }

  await revokeToken(token);

  res.status(200).json(formatMessage("Password berhasil diubah"));
};

const checkToken = async (req, res) => {
  const { token } = req.query;

  const decoded = await verifyResetToken(token);
  
  if (!decoded) {
    return res.status(400).json(formatMessage("Token tidak valid atau telah dibatalkan", null, 400));
  }

  res.status(200).json(formatMessage("Token valid"));
};

module.exports = { requestResetPassword, resetPassword, checkToken };
