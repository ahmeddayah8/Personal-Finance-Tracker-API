import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Si toos ah backend/.env uga akhri
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Hubin
console.log("Cloudinary ENV:", {
  cloudName: cloudName ? "FOUND" : "MISSING",
  apiKey: apiKey ? "FOUND" : "MISSING",
  apiSecret: apiSecret ? "FOUND" : "MISSING",
});

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;
