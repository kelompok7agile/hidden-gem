const jwt = require("jsonwebtoken");

const generateResetToken = (email) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = "1h";
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