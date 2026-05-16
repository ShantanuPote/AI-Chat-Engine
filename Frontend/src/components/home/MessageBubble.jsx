import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-[0_16px_40px_-28px_rgba(0,0,0,0.8)] sm:max-w-[70%] ${
          isUser
            ? "border-transparent bg-[#2a2a2f] text-[var(--color-text)]"
            : "border-[#2a2a2f] bg-[#151518] text-[var(--color-text)]"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <span className="mt-2 block text-[11px] text-[var(--color-muted)]">
          {message.time}
        </span>
      </article>
    </div>
  );
};

export default MessageBubble;
