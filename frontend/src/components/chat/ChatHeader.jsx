import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { MoreVertical, ArrowLeft } from "lucide-react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-blue-100 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedUser(null)}
            className="lg:hidden p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Avatar
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            size="lg"
            online={isOnline}
          />
          
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate">
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm ${isOnline ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50 dark:hover:bg-gray-700">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
