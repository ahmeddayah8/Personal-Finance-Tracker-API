import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.js";

export const uploadProfilePicture = async (req, res, next) => {
  try {
    // 1. Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // 2. Get logged-in user id
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found",
      });
    }

    // 3. Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "AD8_upload",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        },
      );

      uploadStream.end(req.file.buffer);
    });

    // 4. Make sure Cloudinary returned URL
    if (!result?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // 5. Save image URL in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: result.secure_url,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 6. Send updated user
    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      fileUrl: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};
