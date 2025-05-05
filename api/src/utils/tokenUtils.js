const jwt = require("jsonwebtoken");
const supabase = require("../config/database");

const revokeToken = async (token) => {
    const { data, error } = await supabase.from('revoked_tokens').insert([{ token }]);
    if (error) {
        console.error('Error revoking token:', error);
    } else {
        console.log('Token berhasil dibatalkan:', data);
    }
};


const generateResetToken = (email) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = "30d";
    return jwt.sign({email}, secret, {expiresIn});
};

const verifyResetToken = async (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, secret);
        
        const { data, error } = await supabase
            .from('revoked_tokens')
            .select('*')
            .eq('token', token)
            .single(); 

        if (data) {
            throw new Error('Token telah dibatalkan');
        }

        return decoded; 
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};


module.exports = { generateResetToken, verifyResetToken, revokeToken }