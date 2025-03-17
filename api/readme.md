Konsep **Layered Architecture** supaya lebih modular dan scalable.  

---

## **1️⃣ Struktur Folder yang Rapi**  
Gunakan struktur berikut:  

```bash
📂 project-root
 ┣ 📂 src
 ┃ ┣ 📂 config         # Konfigurasi (db, env, dll)
 ┃ ┣ 📂 routes         # Routing API
 ┃ ┣ 📂 controllers    # Logic request-response
 ┃ ┣ 📂 services       # Business logic (processing)
 ┃ ┣ 📂 repositories   # Query database (Data Source)
 ┃ ┣ 📂 models         # Schema database (jika pakai ORM)
 ┃ ┣ 📂 middlewares    # Middleware (auth, error handling, dll)
 ┃ ┣ 📂 utils          # Helper/global function (formatter, logger, dll)
 ┃ ┣ 📂 validations    # Validasi input request (Joi, express-validator)
 ┃ ┣ 📂 tests          # Unit testing
 ┃ ┗ 📜 app.js         # Inisialisasi Express
 ┣ 📜 .env             # Environment variable
 ┣ 📜 package.json     # Dependencies
 ┣ 📜 knexfile.js      # Konfigurasi Knex.js
 ┗ 📜 server.js        # Entry point (jalankan Express)
```

## **2️⃣ Penjelasan Tiap Folder**
🔹 **`config/`** → Untuk konfigurasi database, environment, dll.  
🔹 **`routes/`** → Menyimpan routing API per fitur.  
🔹 **`controllers/`** → Handling request-response, tidak ada logic bisnis di sini.  
🔹 **`services/`** → Logic utama, memanggil repository.  
🔹 **`repositories/`** → Query langsung ke database (tanpa logic bisnis).  
🔹 **`models/`** → ORM Schema, jika pakai Sequelize atau Objection.js.  
🔹 **`middlewares/`** → Middleware seperti auth, error handling, logging.  
🔹 **`utils/`** → Global function seperti formatter, hash password, logger.  
🔹 **`validations/`** → Validasi request pakai **Joi** atau **express-validator**.  
🔹 **`tests/`** → Untuk unit testing dan integration test.  

---

## **3️⃣ Contoh Implementasi**
### **📌 1. Config Database (`config/db.js`)**
```js
const knex = require("knex");
const config = require("../knexfile");

const db = knex(config.development);

module.exports = db;
```

---

### **📌 2. Repository (Query DB) (`repositories/userRepository.js`)**
```js
const db = require("../config/db");

class UserRepository {
  static async getUserByEmail(email) {
    return db("users").where({ email }).first();
  }

  static async createUser(user) {
    return db("users").insert(user).returning("*");
  }
}

module.exports = UserRepository;
```
🔹 **📌 Kenapa repository?**  
➡️ Agar query database dipisah dari logic bisnis.  
➡️ Kalau nanti ganti ORM/Database, hanya perlu ubah di sini.  

---

### **📌 3. Service Layer (Logic Bisnis) (`services/userService.js`)**
```js
const UserRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

class UserService {
  static async registerUser(name, email, password) {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return UserRepository.createUser({ name, email, password: hashedPassword });
  }
}

module.exports = UserService;
```
🔹 **📌 Kenapa pakai service?**  
➡️ Supaya logic bisnis tidak bercampur di controller.  

---

### **📌 4. Controller (Handling Request) (`controllers/userController.js`)**
```js
const UserService = require("../services/userService");

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json({ message: "User registered", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
```
🔹 **📌 Kenapa controller hanya menangani request-response?**  
➡️ Supaya tetap ringan dan mudah dibaca.  
➡️ Logic bisnis ada di service.  

---

### **📌 5. Routing (`routes/userRoutes.js`)**
```js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);

module.exports = router;
```

---

### **📌 6. Middleware (Contoh Auth) (`middlewares/authMiddleware.js`)**
```js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
```
🔹 **📌 Kenapa middleware?**  
➡️ Supaya auth bisa digunakan di banyak route tanpa duplicate code.  

---

### **📌 7. Util Function (Format Tanggal) (`utils/formatter.js`)**
```js
const moment = require("moment");

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = { formatDate };
```

---

### **📌 8. Setup Express (`app.js`)**
```js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
```

---

### **📌 9. Server Entry Point (`server.js`)**
```js
const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## **4️⃣ Kesimpulan**
✔ **Folder rapi & terstruktur** → Memisahkan logic bisnis, database, dan request handling.  
✔ **Gunakan repository pattern** → Supaya query database modular & mudah diubah.  
✔ **Gunakan service layer** → Agar controller tetap bersih & fokus pada request-response.  
✔ **Pakai middleware** → Untuk reusable logic seperti auth & logging.  
✔ **Pakai utils** → Untuk global function seperti formatter & hashing.  
