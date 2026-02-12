import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64 = reader.result;
      setPreview(base64);
      await updateProfile({ profilePic: base64 });
    };
  };

  return (
    <div className="min-h-screen pt-24 bg-base-200 flex justify-center items-center">
      <div className="bg-base-100 w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <p className="text-center text-sm opacity-60 mb-6">
          Your profile information
        </p>

        {/* profile image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">

            <img
              src={
                preview ||
                authUser?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-28 h-28 rounded-full object-cover border-4 border-primary"
            />

            <label className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
          </div>

          <p className="text-xs mt-2 opacity-60">
            Click camera icon to update your photo
          </p>
        </div>

        {/* inputs */}
        <div className="space-y-4">
          <div>
            <p className="text-sm opacity-60 mb-1">Full Name</p>
            <input
              value={authUser?.fullName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="text-sm opacity-60 mb-1">Email Address</p>
            <input
              value={authUser?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* account info */}
        <div className="mt-6 border-t pt-4">
          <h2 className="font-semibold mb-3">Account Information</h2>

          <div className="flex justify-between text-sm mb-2">
            <span className="opacity-60">Member Since</span>
            <span>
              {authUser?.createdAt
                ? new Date(authUser.createdAt).toLocaleDateString()
                : "2024"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="opacity-60">Account Status</span>
            <span className="text-green-500 font-semibold">Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
