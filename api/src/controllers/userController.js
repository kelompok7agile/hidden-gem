const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const register = async (req, res) => {
  try {
    const {
      nama,
      email,
      password,
      nomor_telepon,
      user_group_id = "02",
    } = req.body;

    const existingUser = await userModel.findUserByEmail(email); //pengecekan email
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser({
      nama,
      email,
      password: hashedPassword,
      nomor_telepon,
      user_group_id,
    });
    res.status(201).json({ message: "User berhasil didaftarkan", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat membuat user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //cek email
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    //cek password
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }
    //cek role
    let role;
    if (user.user_group_id === "01") {
      role = "admin";
    } else if (user.user_group_id === "02") {
      role = "user";
    } else {
      return res.status(403).json({ message: "Role tidak valid" });
    }
    //generate token jwt
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "10s",
    });
    const existingToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTc0MjMwNjk5NCwiZXhwIjoxNzQyMzA3MDA0fQ.XHlOhxkVr4c-NuF7MBSRoYnICwZUQZnCsYDZEsuuyPk";
    const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);

    if(decoded){
      console.log("decoded: ", decoded);
    }else {
      console.log("Expired token");
    }
    const { password: userPassword, ...userWithoutPassword } = user;
    console.log("userPassword: ", userWithoutPassword);
    let obj = {
      token,
      role,
      ...userWithoutPassword
    };
    res.status(200).json({
      message: "Login berhasil",
      code: 200,
      data: obj,
    });
  } catch (error) {
    console.log("kesalahan saat login: ", error);
    res.status(500).json({ message: "Terjadi kesalahan saat login", error });
  }
};

module.exports = {
  register,
  login,
};
