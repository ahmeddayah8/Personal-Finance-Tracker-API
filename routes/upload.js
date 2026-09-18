import express from "express";

import { uploadProfilePicture } from "../controllers/uploadControllers.js";

import { protect } from "../middlewares/auth.js";

import {upload} from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload profile picture
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Image required
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

export default router;