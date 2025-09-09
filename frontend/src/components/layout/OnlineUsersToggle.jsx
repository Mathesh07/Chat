import { useState } from "react";
import { Users, Eye, EyeOff } from "lucide-react";
import Button from "../ui/Button";

const OnlineUsersToggle = ({ showOnlineOnly, setShowOnlineOnly, onlineCount, totalCount }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
        <Users className="w-4 h-4 mr-2" />
        {showOnlineOnly ? `Online Users (${onlineCount})` : `All Users (${totalCount})`}
      </h2>
      
      <Button
        onClick={() => setShowOnlineOnly(!showOnlineOnly)}
        variant="ghost"
        size="sm"
        className="p-1 hover:bg-blue-50 dark:hover:bg-gray-700"
        title={showOnlineOnly ? "Show all users" : "Show only online users"}
      >
        {showOnlineOnly ? (
          <Eye className="w-4 h-4 text-green-600" />
        ) : (
          <EyeOff className="w-4 h-4 text-gray-500" />
        )}
      </Button>
    </div>
  );
};

export default OnlineUsersToggle;
