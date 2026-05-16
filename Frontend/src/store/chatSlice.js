import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialChats = [
  {
    id: "chat-1",
    title: "Design sprint notes",
    preview: "Summarize today's user insights",
    time: "2h",
    messages: [],
  },
  {
    id: "chat-2",
    title: "Marketing brainstorm",
    preview: "Give me 5 taglines for...",
    time: "Yesterday",
    messages: [],
  },
  {
    id: "chat-3",
    title: "Resume review",
    preview: "Improve this bullet point",
    time: "Mon",
    messages: [],
  },
];

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: initialChats,
    currentChatId: initialChats[0]?.id ?? null,
  },
  reducers: {
    addChat: {
      reducer(state, action) {
        state.chats.unshift(action.payload);
        state.currentChatId = action.payload.id;
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            preview: "New conversation",
            time: "Now",
            messages: [],
          },
        };
      },
    },
    setCurrentChat(state, action) {
      state.currentChatId = action.payload;
    },
    addMessage(state, action) {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((item) => item.id === chatId);
      if (!chat) return;
      chat.messages.push(message);
      chat.preview = message.text.slice(0, 42);
      chat.time = "Now";
    },
  },
});

export const { addChat, setCurrentChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
