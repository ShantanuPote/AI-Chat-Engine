import React from "react";

const ChatSidebarContent = ({
  previousChats,
  searchValue,
  onSearchChange,
  onNewChat,
  onSelectChat,
  currentChatId,
}) => (
  <>
    <button
      className="flex items-center gap-3 rounded-xl bg-[#1b1b1f] px-3 py-2 text-sm font-medium"
      type="button"
      onClick={onNewChat}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2a2a2f] text-lg">
        +
      </span>
      New chat
    </button>

    <div className="mt-3 rounded-2xl border border-[#2a2a2f] bg-[#151518] px-3 py-3 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.9)]">
      <label className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        Search chats
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#222228] bg-[#0f0f12] px-3 py-2">
        <span className="text-xs text-[var(--color-muted)]">⌕</span>
        <input
          type="text"
          placeholder="Type to filter..."
          value={searchValue}
          onChange={onSearchChange}
          className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
        />
      </div>
    </div>

    <div className="mt-8">
      <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
        Recents
      </p>
      <div className="flex flex-col gap-1 text-sm">
        {previousChats.map((chat) => (
          <button
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[var(--color-text)] hover:bg-[#151518] ${
              chat.id === currentChatId ? "bg-[#151518]" : ""
            }`}
            key={chat.id}
            type="button"
            onClick={() => onSelectChat(chat.id)}
          >
            <span className="truncate">{chat.title}</span>
            <span className="text-xs text-[var(--color-muted)]">{chat.time}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--color-text)]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222228] text-xs">
        SP
      </span>
      Shantanu pote
    </div>
  </>
);

const ChatSidebar = ({
  previousChats,
  searchValue,
  onSearchChange,
  onNewChat,
  onSelectChat,
  currentChatId,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <aside className="hidden lg:flex h-screen flex-col border-r border-[var(--color-border)] bg-[#0c0c0d] px-4 py-4 text-[var(--color-text)]">
        <ChatSidebarContent
          previousChats={previousChats}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onNewChat={onNewChat}
          onSelectChat={onSelectChat}
          currentChatId={currentChatId}
        />
      </aside>

      <div
        className={`lg:hidden ${
          isOpen ? "fixed" : "hidden"
        } inset-0 z-40 bg-black/70`}
        onClick={onClose}
        role="presentation"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--color-border)] bg-[#0c0c0d] px-4 py-4 text-[var(--color-text)] transition-transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Menu
          </p>
          <button
            className="text-[var(--color-muted)]"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="mt-4 flex h-full flex-col">
          <ChatSidebarContent
            previousChats={previousChats}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onNewChat={onNewChat}
            onSelectChat={onSelectChat}
            currentChatId={currentChatId}
          />
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
