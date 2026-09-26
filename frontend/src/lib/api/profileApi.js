import api from "./apiClient";

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();

  formData.append("profilePicture", file);

  const response = await api.post(
    "/upload/profile-picture",
    formData
  );

  return response.data;
};