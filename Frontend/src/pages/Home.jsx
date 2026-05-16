import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/home/ChatHeader";
import ChatInput from "../components/home/ChatInput";
import ChatMessages from "../components/home/ChatMessages";
import ChatSidebar from "../components/home/ChatSidebar";
import { addChat, addMessage, setCurrentChat } from "../store/chatSlice";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { chats, currentChatId } = useSelector((state) => state.chat);

  const currentChat = useMemo(() => {
    return chats.find((chat) => chat.id === currentChatId) ?? null;
  }, [chats, currentChatId]);

  const latestChatTitle = useMemo(() => {
    return currentChat?.title ?? "ChatGPT";
  }, [currentChat]);

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return chats;
    return chats.filter((chat) =>
      [chat.title, chat.preview].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [chats, searchQuery]);

  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = userInput.trim();
    if (!trimmed || !currentChatId) return;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: trimmed,
      time: timeLabel,
    };

    const newAiMessage = {
      id: `msg-${Date.now()}-ai`,
      role: "ai",
      text: "Got it. Give me a second to think through that.",
      time: timeLabel,
    };

    dispatch(addMessage({ chatId: currentChatId, message: newUserMessage }));
    dispatch(addMessage({ chatId: currentChatId, message: newAiMessage }));
    setUserInput("");
  };

  const handleNewChat = () => {
    const title = window.prompt("Enter a title for this chat:");
    const trimmed = title ? title.trim() : "";
    if (!trimmed) return;
    dispatch(addChat(trimmed));
    setIsMenuOpen(false);
  };

  const handleSelectChat = (chatId) => {
    dispatch(setCurrentChat(chatId));
    setIsMenuOpen(false);
  };

  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] bg-black">
      <ChatSidebar
        previousChats={filteredChats}
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <section className="flex h-screen min-w-0 flex-col overflow-hidden px-4 pb-6 pt-4 lg:px-12">
        <ChatHeader
          title={latestChatTitle}
          onMenuClick={() => setIsMenuOpen(true)}
        />
        <ChatMessages messages={currentChat?.messages ?? []} />
        <div className="flex-shrink-0 bg-black/90 pb-2 pt-4 backdrop-blur">
          <div className="mx-auto w-full max-w-2xl">
            <ChatInput
              userInput={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onSend={handleSend}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
