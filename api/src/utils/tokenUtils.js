const jwt = require("jsonwebtoken");

const generateResetToken = (email) => {
    const secret = process.env.JWT_SECRET;
    // set the expiration time to unlimited for the reset token
    const expiresIn = "30d"; // 1 hour expiration time
    return jwt.sign({email}, secret, {expiresIn});
};

const verifyResetToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return error;
    }
}

module.exports = { generateResetToken, verifyResetToken }