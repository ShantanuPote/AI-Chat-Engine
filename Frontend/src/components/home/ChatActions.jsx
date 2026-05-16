import React from "react";

const actions = [
  "Create an image",
  "Write or edit",
  "Look something up",
];

const ChatActions = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {actions.map((label) => (
        <button
          className="flex items-center gap-2 rounded-full border border-[#2a2a2f] bg-[#111114] px-4 py-2 text-xs text-[var(--color-text)] hover:border-[#3a3a42]"
          key={label}
          type="button"
        >
          <span className="h-2 w-2 rounded-full bg-[#4a4a52]" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChatActions;
