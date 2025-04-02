const supabase = require("../config/database");

const getAllUsers = async () => {
    try {
        const { data, error } = await supabase
            .from("user") // Nama tabel di Supabase
            .select("id, nama, email"); // Ambil semua kolom

        if (error) {
            console.error("Error fetching all users:", error.message);
            throw error;
        }

        console.log("Fetched users:", data);
        return data;
    } catch (err) {
        console.error("Unexpected error fetching all users:", err.message);
        throw err;
    }
};

//cari email user
const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from("user")
        .select("nama, email, password, salt_password, user_group_id") // hanya mengambil kolom nama dan email
        .eq("email", email)
        .maybeSingle(); // mengambil satu baris data

    if (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
    return data;
}

//buat user baru
const createUser = async (user) => {
    console.log("Inserting user:", user);

    const { data, error } = await supabase
        .from("user")
        .insert([user])
        .select("nama, email, no_telepon");

    if (error) {
        console.error("Error creating user:", error.message);
        throw error;
    }

    console.log("Insert result:", data);

    if (!data || data.length === 0) {
        throw new Error("Failed to create user: No rows returned");
    }

    return data;
};

module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
};