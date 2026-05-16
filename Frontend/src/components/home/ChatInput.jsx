import React from "react";

const ChatInput = ({ userInput, onChange, onSend }) => {
  return (
    <form
      className="mx-auto flex w-full max-w-[640px] items-center gap-3 rounded-[999px] border border-[#2a2a2f] bg-[#1b1b1f] px-4 py-3 shadow-[0_16px_40px_-26px_rgba(0,0,0,0.9)]"
      onSubmit={onSend}
    >
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2a2f] text-[var(--color-muted)]"
      >
        +
      </button>
      <input
        type="text"
        placeholder="Ask anything"
        value={userInput}
        onChange={onChange}
        className="flex-1 bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
      />
      <button
        type="submit"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2a2f] text-[var(--color-muted)]"
      >
        →
      </button>
    </form>
  );
};

export default ChatInput;
