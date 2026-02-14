import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";

const MessageContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const bottomRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content">
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
    <div className="flex-1 flex flex-col bg-base-100 text-base-content h-full overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-base-300 flex items-center gap-3 bg-base-200">
        <img
          src={selectedAvatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold">{selectedUser.fullName}</h2>
          <p className="text-xs opacity-60">Online</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6 pb-24">
        {messages.map((msg) => {
          const isMe = msg.senderId === authUser?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={selectedAvatar}
                  alt="user"
                  className="w-8 h-8 rounded-full mr-2 mt-1"
                />
              )}

              <div className="flex flex-col max-w-xs">
                <span className="text-xs opacity-50 mb-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="message"
                    className="w-56 rounded-xl mb-1 border border-base-300"
                  />
                )}

                {msg.text && (
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm break-words
                    ${
                      isMe
                        ? "bg-primary text-primary-content rounded-br-none"
                        : "bg-base-300 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>

              {isMe && (
                <img
                  src={myAvatar}
                  alt="me"
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
          <img
            src={image}
            alt="preview"
            className="w-32 rounded-lg border border-base-300"
          />
        </div>
      )}

      {/* INPUT */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-base-300 flex items-center gap-3 bg-base-200"
      >
        <label className="cursor-pointer">
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
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageContainer;
