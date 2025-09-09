import { formatMessageTime } from "../../lib/utils";
import Avatar from "../ui/Avatar";

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`flex items-end space-x-2 max-w-[75%] sm:max-w-[65%] ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
        {!isOwn && (
          <Avatar
            src={message.sender?.profilePic}
            alt={message.sender?.fullName}
            size="sm"
            className="flex-shrink-0 mb-1"
          />
        )}
        
        <div className={`relative px-3 py-2 rounded-2xl shadow-sm ${
          isOwn 
            ? "bg-blue-500 text-white rounded-br-sm" 
            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-sm"
        }`}>
          {message.image && (
            <img
              src={message.image}
              alt="Message attachment"
              className="mb-2 rounded-lg max-w-full h-auto"
            />
          )}
          
          {message.text && (
            <p className="text-sm leading-relaxed break-words">
              {message.text}
            </p>
          )}
          
          <div className={`text-xs mt-1 opacity-70 ${
            isOwn ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          }`}>
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
