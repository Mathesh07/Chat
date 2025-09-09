import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { MessageCircle, Search, LogOut } from "lucide-react";
import Avatar from "../ui/Avatar";
import LoadingSpinner from "../ui/LoadingSpinner";
import OnlineUsersToggle from "./OnlineUsersToggle";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { logout, authUser, onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter(user => {
    // Exclude the current user from the chat list
    if (user._id === authUser?._id) return false;
    
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const isOnline = onlineUsers.includes(user._id);
    
    if (showOnlineOnly) {
      return matchesSearch && isOnline;
    }
    return matchesSearch;
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full lg:w-80 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 lg:border-r border-blue-100 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-blue-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">Chaty</h1>
            <p className="text-xs lg:text-sm text-blue-600 dark:text-blue-400">Stay connected</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-3 lg:p-4">
          <OnlineUsersToggle
            showOnlineOnly={showOnlineOnly}
            setShowOnlineOnly={setShowOnlineOnly}
            onlineCount={onlineUsers.filter(userId => userId !== authUser?._id).length}
            totalCount={users.length}
          />
          
          {isUsersLoading ? (
            <LoadingSpinner size="md" text="Loading conversations..." />
          ) : (
            <div className="space-y-1 lg:space-y-2">
              {filteredUsers.map((user) => {
                const isOnline = onlineUsers.includes(user._id);
                const isSelected = selectedUser?._id === user._id;
                
                return (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-3 lg:p-3 rounded-xl text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={user.profilePic}
                        alt={user.fullName}
                        size="md"
                        online={isOnline}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate text-sm lg:text-base ${
                          isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"
                        }`}>
                          {user.fullName}
                        </p>
                        <p className={`text-xs lg:text-sm truncate ${
                          isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                      {isOnline && (
                        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </button>
                );
              })}
              
              {filteredUsers.length === 0 && !isUsersLoading && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base">
                    {showOnlineOnly ? "No online users" : "No conversations found"}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-500">
                    {showOnlineOnly ? "Try showing all users" : "Start a new conversation"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-blue-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar
            src={authUser?.profilePic}
            alt={authUser?.fullName}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm lg:text-base">{authUser?.fullName}</p>
            <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 truncate">{authUser?.email}</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-xl transition-colors duration-200 w-full lg:w-auto"
          >
            <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs lg:text-sm text-red-700 dark:text-red-400">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
