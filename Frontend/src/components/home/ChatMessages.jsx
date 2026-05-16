import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatMessages = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
          Where should we begin?
        </h1>
      </div>
    );
  }

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="scrollbar-hidden flex min-w-0 flex-1 flex-col overflow-y-auto px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
