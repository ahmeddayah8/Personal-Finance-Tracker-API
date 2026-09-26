import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Camera, Mail, Shield, User } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// GET profile
import { getProfile } from "@/lib/api/authApi";

// UPLOAD profile picture
import { uploadProfilePicture } from "@/lib/api/profileApi";

const Profile = () => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const [preview, setPreview] = useState("");
  const [fileError, setFileError] = useState("");

  // =========================
  // GET PROFILE
  // =========================
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const profile = data?.user || data;

  // =========================
  // UPLOAD PROFILE PICTURE
  // =========================
  const uploadMutation = useMutation({
    mutationFn: uploadProfilePicture,

    onSuccess: async (data) => {
      setFileError("");

      // Haddii backend-ku user cusub soo celiyo,
      // React Query cache-ka update garee.
      if (data?.user) {
        queryClient.setQueryData(["profile"], { user: data.user });
      }

      // Profile-ka backend-ka mar kale kasoo qaado
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error) => {
      console.error("UPLOAD ERROR:", error?.response?.data || error);

      const message =
        error?.response?.data?.message || "Failed to upload profile picture.";

      setFileError(message);

      // Preview-ka HA tirtirin.
    },
  });

  // =========================
  // SELECT IMAGE
  // =========================
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileError("");

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setFileError("Only JPG, PNG or WEBP images are allowed.");

      event.target.value = "";
      return;
    }

    // Maximum 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setFileError("Image must be smaller than 5MB.");

      event.target.value = "";
      return;
    }

    // =========================
    // SHOW PREVIEW
    // =========================
    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    // =========================
    // UPLOAD
    // =========================
    uploadMutation.mutate(file);

    // Allow same image to be selected again
    event.target.value = "";
  };

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="py-10">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  // =========================
  // PROFILE ERROR
  // =========================
  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-600">
          {error?.response?.data?.message || "Failed to load profile."}
        </p>
      </div>
    );
  }

  // =========================
  // PROFILE VALUES
  // =========================
  const firstLetter = profile?.name?.charAt(0)?.toUpperCase() || "U";

  const imageUrl = preview || profile?.profilePicture || "";

  return (
    <div className="space-y-6">
      {/* =========================
          PAGE HEADER
      ========================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

        <p className="mt-1 text-muted-foreground">
          Manage your account information and profile picture.
        </p>
      </div>

      {/* =========================
          PROFILE CARD
      ========================= */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
        {/* CARD HEADER */}
        <div>
          <h2 className="text-xl font-semibold">Profile Information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your Personal Finance Tracker account.
          </p>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* =========================
              LEFT - PROFILE IMAGE
          ========================= */}
          <div className="flex flex-col items-center">
            <Avatar className="size-40 border-4 border-background shadow-md">
              {imageUrl && (
                <AvatarImage
                  src={imageUrl}
                  alt={profile?.name || "Profile"}
                  className="object-cover"
                />
              )}

              <AvatarFallback className="text-4xl font-semibold">
                {firstLetter}
              </AvatarFallback>
            </Avatar>

            {/* HIDDEN FILE INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* CHANGE PHOTO */}
            <Button
              type="button"
              variant="outline"
              className="mt-5"
              disabled={uploadMutation.isPending}
              onClick={() => {
                setFileError("");
                fileInputRef.current?.click();
              }}
            >
              <Camera className="mr-2 size-4" />

              {uploadMutation.isPending ? "Uploading..." : "Change Photo"}
            </Button>

            {/* IMAGE INFO */}
            <p className="mt-4 text-center text-xs text-muted-foreground">
              JPG, PNG or WEBP. Maximum 5MB.
            </p>

            {/* UPLOADING */}
            {uploadMutation.isPending && (
              <p className="mt-3 text-sm text-muted-foreground">
                Uploading image...
              </p>
            )}

            {/* ERROR */}
            {fileError && (
              <p className="mt-3 text-center text-sm font-medium text-red-600">
                {fileError}
              </p>
            )}

            {/* SUCCESS */}
            {uploadMutation.isSuccess &&
              !uploadMutation.isPending &&
              !fileError && (
                <p className="mt-3 text-center text-sm font-medium text-green-600">
                  Profile picture updated successfully.
                </p>
              )}
          </div>

          {/* =========================
              RIGHT - USER INFO
          ========================= */}
          <div className="space-y-4">
            {/* NAME */}
            <div className="flex items-center gap-4 rounded-xl border p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                <User className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Name</p>

                <p className="truncate font-semibold">
                  {profile?.name || "No name"}
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-4 rounded-xl border p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Mail className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="break-all font-semibold">
                  {profile?.email || "No email"}
                </p>
              </div>
            </div>

            {/* ROLE */}
            <div className="flex items-center gap-4 rounded-xl border p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Shield className="size-5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Role</p>

                <p className="font-semibold capitalize">
                  {profile?.role || "user"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
