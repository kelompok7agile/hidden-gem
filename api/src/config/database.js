require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Ambil konfigurasi dari file .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.ANON_KEY;

// Validasi konfigurasi
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('SUPABASE_URL atau ANON_KEY tidak ditemukan di file .env');
}

// Inisialisasi Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;