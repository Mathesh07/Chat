import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/layout/Sidebar";
import NoChatSelected from "../components/chat/NoChatSelected";
import ChatContainer from "../components/chat/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile Layout */}
      <div className="lg:hidden h-screen flex flex-col">
        {!selectedUser ? (
          <div className="flex-1">
            <Sidebar />
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <ChatContainer />
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-center pt-6 px-4 pb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 w-full max-w-7xl h-[calc(100vh-3rem)] overflow-hidden">
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;