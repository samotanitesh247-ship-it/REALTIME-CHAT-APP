import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-[#020617]">

      {/* leave space for navbar */}
      <div className="flex pt-16 h-full">

        <Sidebar />

        {!selectedUser ? (
          <div className="flex-1 flex items-center justify-center text-white">
            Select user to start chatting
          </div>
        ) : (
          <MessageContainer />
        )}

      </div>
    </div>
  );
};

export default HomePage;
