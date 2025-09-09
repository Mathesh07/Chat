import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, User, Mail, Calendar, Save } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Avatar from "../../components/ui/Avatar";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-6 sm:py-8 text-white">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Profile Settings</h1>
            <p className="text-blue-100 text-sm sm:text-base">Manage your account information and preferences</p>
          </div>

          <div className="p-4 sm:p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="relative mb-4">
                <Avatar
                  src={selectedImg || authUser.profilePic}
                  alt={authUser.fullName}
                  size="2xl"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{authUser.fullName}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{authUser.email}</p>
              {isUpdatingProfile && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Updating profile...</p>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">{authUser.fullName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">{authUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member Since
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-600">
                <Button variant="secondary" className="flex-1 text-sm sm:text-base">
                  Change Password
                </Button>
                <Button variant="danger" className="flex-1 text-sm sm:text-base">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
