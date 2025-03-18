const db = require("../config/database.js");

const findUserByEmail = async (email) => {
    return await db("users").where({ email }).first();
};

const createUser = async (user) => {
    return await db("users").insert(user).returning("*");
};

module.exports = {
    findUserByEmail,
    createUser,
};