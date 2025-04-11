const express = require("express");
const cors = require("cors");
const path = require("path");
const supabase = require("./config/database.js");
require("dotenv").config();
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs-extra");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const tempatRoutes = require("./routes/tempatRoutes.js");
const resetRoutes = require("./routes/resetRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/dokumen", express.static(path.join(__dirname, "../uploads/dokumen")));
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/tempat", tempatRoutes);
app.use("/reset", resetRoutes);
app.use("/review", reviewRoutes);

app.get("/api/image/tempat/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", "dokumen", filename);
  console.log(filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    } else {
      console.log("File sent:", filename);
    }
  });
});

app.get("/api/image/user/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", "dokumen", filename);
  console.log(filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    } else {
      console.log("File sent:", filename);
    }
  });
});

const parsedData = require("./parsed_tempat.json");
const IMAGE_FOLDER = path.resolve(__dirname, "../uploads/dokumen");
const DEFAULT_USER_ID = 10;

fs.ensureDirSync(IMAGE_FOLDER);

async function downloadImage(url, filename) {
  try {
    const response = await axios.get(url, {
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(`❌ Failed to download ${url}:`, err.message);
  }
}


async function scrapeImgurLink(link) {
  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);
    const imageUrls = [];

    $('meta[property="og:image"]').each((_, el) => {
      const content = $(el).attr("content");
      if (content) imageUrls.push(content);
    });

    $("img").each((_, el) => {
      const src = $(el).attr("src");
      if (src && src.includes("i.imgur.com")) {
        const fullUrl = src.startsWith("http") ? src : `https:${src}`;
        if (!imageUrls.includes(fullUrl)) imageUrls.push(fullUrl);
      }
    });

    return [...new Set(imageUrls)];
  } catch (err) {
    console.error("Error scraping:", link, err.message);
    return [];
  }
}

app.get("/insert-json", async (req, res) => {
  try {
    for (const tempat of parsedData) {
      const { data, error } = await supabase
        .from("tempat")
        .insert({
          nama: tempat.nama,
          alamat: tempat.alamat,
          deskripsi: tempat.deskripsi,
          link_gmaps: tempat.link_gmaps,
          jam_operasional: tempat.jam_operasional,
          list_kategori_tempat_id: tempat.list_kategori_tempat_id,
          list_fasilitas_id: 24,
          dibuat_oleh_user_id: DEFAULT_USER_ID,
          dibuat_pada: new Date().toISOString(),
        })
        .select("tempat_id")
        .single();

      if (error) {
        console.error("Insert tempat error:", error.message);
        continue;
      }

      const tempatId = data.tempat_id;

      for (const link of tempat.foto_imgur_links || []) {
        const imgUrls = await scrapeImgurLink(link);
        
        for (const url of imgUrls) {

          if (url == '?fb' || url == '?fbclid=') {
            continue;
          }
          const fileName = path.basename(url.split("?")[0]);
          const savePath = path.join(IMAGE_FOLDER, fileName);
          await downloadImage(url.replace(/\.jpg|\.png|\.gif/i, (match) => match.toLowerCase()).replace('?fb', ''), savePath);

          const { error: fotoErr } = await supabase.from("foto_tempat").insert({
            tempat_id: tempatId,
            user_id: DEFAULT_USER_ID,
            foto: fileName,
            dibuat_pada: new Date().toISOString(),
            dibuat_oleh_user_id: DEFAULT_USER_ID,
          });

          if (fotoErr) {
            console.error("Insert foto error:", fotoErr.message);
          } else {
            console.log(`Saved image ${fileName} for tempat_id ${tempatId}`);
          }
        }
      }
    }

    res.send("Insert selesai 🚀");
  } catch (err) {
    console.error("Fatal error:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = app;
