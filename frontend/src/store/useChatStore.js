import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSending: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("getUsers error:", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  setSelectedUser: async (user) => {
    set({ selectedUser: user, messages: [] });

    try {
      const res = await axiosInstance.get(`/messages/${user._id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("getMessages error:", error);
    }
  },

  sendMessage: async (text, image) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      set({ isSending: true });

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { text, image }
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("sendMessage error:", error);
    } finally {
      set({ isSending: false });
    }
  },
}));
