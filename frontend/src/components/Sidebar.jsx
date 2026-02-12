import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  return (
    <aside className="h-full w-80 bg-[#020617] border-r border-slate-800 flex flex-col">

      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Users size={18} />
          Contacts
        </div>

        <label className="flex items-center gap-2 mt-3 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          Show online only
          <span className="text-xs opacity-60">
            ({onlineUsers.length} online)
          </span>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);

          // RANDOM AVATAR IF NO PROFILE PIC
          const avatar =
            user.profilePic ||
              `https://i.pravatar.cc/150?u=${user._id}`;


          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all mb-1
              hover:bg-slate-800
              ${selectedUser?._id === user._id ? "bg-slate-800" : ""}`}
            >
              <div className="relative">
                <img
                  src={avatar}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full"></span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {user.fullName}
                </span>
                <span className="text-xs text-slate-400">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
