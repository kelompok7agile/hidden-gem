const app = require('./src/app'); // Import app.js
const supabase = require('./src/config/database'); // Import Supabase client
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables

// Cek koneksi Supabase
(async () => {
    try {
        const { error } = await supabase.from('user').select('*').limit(1); // Ganti 'user' dengan nama tabel Anda
        if (error) {
            console.error('Supabase connection failed:', error.message);
        } else {
            console.log('Supabase connection successful.');
        }
    } catch (err) {
        console.error('Supabase connection failed:', err.message);
    }
})();

// Jalankan server
const PORT = 5000; // Port server
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});