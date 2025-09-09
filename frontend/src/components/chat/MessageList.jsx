import MessageItem from "./MessageItem";

const MessageList = ({ messages, authUser }) => {
  return (
    <div className="flex-1 p-4 sm:p-6 space-y-2">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          message={message}
          isOwn={message.senderId === authUser._id}
        />
      ))}
      
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No messages yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Send a message to start the conversation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
