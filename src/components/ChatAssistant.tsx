import { useState } from "react";
import { ASSISTANT_DISPLAY_NAME, sendChatMessage } from "../assistant";
import type { StudentProfile } from "../matching";

interface ChatMessage {
  from: "student" | "buddy";
  text: string;
}

interface ChatAssistantProps {
  profile: StudentProfile;
  // Called when the assistant decides to send a connect request on its own
  onAutoConnect: () => void;
}

export function ChatAssistant({ profile, onAutoConnect }: ChatAssistantProps) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "buddy", text: `Hey! I'm ${ASSISTANT_DISPLAY_NAME}. Stuck on homework or looking for someone to study with?` },
  ]);

  const send = () => {
    if (!draft.trim()) return;
    const reply = sendChatMessage(profile, draft);
    setMessages((current) => [...current, { from: "student", text: draft }, { from: "buddy", text: reply.content }]);
    setDraft("");
    if (reply.action === "send_connect_request") onAutoConnect();
  };

  return (
    <section className="chat" id="chat">
      <div className="section-heading">
        <h2>Study with {ASSISTANT_DISPLAY_NAME}</h2>
        <p className="section-sub">Ask about homework, or let {ASSISTANT_DISPLAY_NAME} find you a partner.</p>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <img src="/avatars/sam.svg" className="chat-avatar" />
          <div>
            <strong>{ASSISTANT_DISPLAY_NAME}</strong>
            <span className="chat-status">Online · usually replies instantly</span>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-bubble ${message.from}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form
          className="chat-input"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Message ${ASSISTANT_DISPLAY_NAME}…`}
          />
          <button type="submit" className="icon-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
