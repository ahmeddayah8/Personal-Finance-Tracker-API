import cloudinary from "../utils/cloudinary.js";

export const uploadProfilePicture = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }
  const stream = cloudinary.uploader.upload_stream(
    { folder: "AD8_upload", resource_type: "auto" },
    (error, result) => {
      if (error) return next(error);
      return res.status(201).json({
        success: true,
        fileUrl: result.secure_url,
      });
    },
  );
  stream.end(req.file.buffer);
};
