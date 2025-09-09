import { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { useAuthStore } from "../../store/useAuthStore";
import { 
  Palette, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Monitor,
  Check,
  Volume2,
  VolumeX
} from "lucide-react";
import Button from "../../components/ui/Button";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { authUser } = useAuthStore();
  const [notifications, setNotifications] = useState({
    messages: true,
    sounds: true,
    desktop: false,
  });

  const themes = [
    { id: "light", name: "Light", icon: Sun, description: "Clean and bright" },
    { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
    { id: "system", name: "System", icon: Monitor, description: "Follow system preference" },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-blue-100">Customize your chat experience</p>
          </div>

          <div className="p-6">
            <div className="space-y-8">
              {/* Theme Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                    <p className="text-sm text-gray-600">Choose your preferred theme</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-13">
                  {themes.map((themeOption) => {
                    const Icon = themeOption.icon;
                    const isSelected = theme === themeOption.id;
                    
                    return (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-gray-600"}`} />
                          <span className={`font-medium ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                            {themeOption.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                        </div>
                        <p className={`text-sm ${isSelected ? "text-blue-700" : "text-gray-600"}`}>
                          {themeOption.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                    <p className="text-sm text-gray-600">Manage your notification preferences</p>
                  </div>
                </div>

                <div className="space-y-4 ml-13">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Message Notifications</p>
                        <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('messages')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.messages ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.messages ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {notifications.sounds ? (
                        <Volume2 className="w-5 h-5 text-gray-600" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-gray-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">Sound Notifications</p>
                        <p className="text-sm text-gray-600">Play sound when receiving messages</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('sounds')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.sounds ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.sounds ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Desktop Notifications</p>
                        <p className="text-sm text-gray-600">Show desktop notifications for new messages</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('desktop')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.desktop ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.desktop ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
                    <p className="text-sm text-gray-600">Manage your privacy settings</p>
                  </div>
                </div>

                <div className="space-y-3 ml-13">
                  <Button variant="secondary" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Blocked Users
                  </Button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button className="w-full">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
