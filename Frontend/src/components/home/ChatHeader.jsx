import React from "react";

const ChatHeader = ({ title, onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-2 py-2 text-[var(--color-text)]">
      <div className="flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2a2f] text-[var(--color-muted)] lg:hidden"
          type="button"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <button className="flex items-center gap-2 text-sm font-medium">
          {title}
          <span className="text-xs text-[var(--color-muted)]">▾</span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
