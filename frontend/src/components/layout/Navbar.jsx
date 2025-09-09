import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { LogOut, User, MessageCircle, Sun, Moon } from "lucide-react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Chaty</span>
          </Link>

          {/* User Menu */}
          {authUser && (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="p-2" title="Profile">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <Avatar
                  src={authUser.profilePic}
                  alt={authUser.fullName}
                  size="sm"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {authUser.fullName}
                </span>
              </div>

              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
