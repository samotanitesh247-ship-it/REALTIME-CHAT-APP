import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";

const MessageContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select conversation
      </div>
    );
  }

  const selectedAvatar =
    selectedUser.profilePic ||
      `https://i.pravatar.cc/150?u=${selectedUser._id}`;

  const myAvatar =
    authUser.profilePic ||
      `https://i.pravatar.cc/150?u=${authUser._id}`;


  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    await sendMessage(text, image);
    setText("");
    setImage(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#020617] h-full overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
        <img
          src={selectedAvatar}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="text-white font-semibold">
            {selectedUser.fullName}
          </h2>
          <p className="text-xs text-slate-400">Offline</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6 pb-24">
        {messages.map((msg) => {
          const isMe = msg.senderId === authUser._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={selectedAvatar}
                  className="w-8 h-8 rounded-full mr-2 mt-1"
                />
              )}

              <div className="flex flex-col max-w-xs">
                <span className="text-xs text-slate-500 mb-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {msg.image && (
                  <img
                    src={msg.image}
                    className="w-56 rounded-xl mb-1 border border-slate-700"
                  />
                )}

                {msg.text && (
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm break-words
                    ${
                      isMe
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>

              {isMe && (
                <img
                  src={myAvatar}
                  className="w-8 h-8 rounded-full ml-2 mt-1"
                />
              )}
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      {/* IMAGE PREVIEW */}
      {image && (
        <div className="px-6 pb-2">
          <img src={image} className="w-32 rounded-lg" />
        </div>
      )}

      {/* INPUT */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-800 flex items-center gap-3 bg-[#020617]"
      >
        <label className="cursor-pointer text-slate-400">
          <ImageIcon size={20} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-xl outline-none"
        />

        <button className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl">
          <Send size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessageContainer;
