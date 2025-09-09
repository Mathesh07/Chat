import { MessageCircle, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="max-w-md text-center px-6">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <MessageCircle className="w-12 h-12 text-white" />
        </div>
        
        {/* Welcome Message */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Welcome to Chaty!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Select a conversation from the sidebar to start chatting with your friends and colleagues.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
