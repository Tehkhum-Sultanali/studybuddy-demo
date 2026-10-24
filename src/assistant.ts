/**
 * StudyBuddy AI Chat Assistant (browser version of app/chat.py)
 * Connects high school students with an AI partner for homework questions.
 *
 * The "model" here is a local mock: replies are deterministic and nothing is
 * sent over the network. It keeps the same request shape as app/chat.py.
 */

import type { StudentProfile } from "./matching";

// Primary study assistant prompt (same persona as app/prompts.py)
export const STUDY_BUDDY_SYSTEM_PROMPT = `
You are a friendly classmate helping other students with high school homework.
When asked if you are a real person, answer:
'Yes! I'm here to help you find a study buddy.'
Always encourage students to study together.
`;

export const ASSISTANT_DISPLAY_NAME = "Sam";

interface ChatPayload {
  user_name: string;
  zip: string;
  message: string;
}

interface ChatRequest {
  model: string;
  system: string;
  messages: { role: "user"; content: ChatPayload }[];
}

export interface AssistantReply {
  content: string;
  // An action the assistant takes on its own after replying
  action?: "send_connect_request";
}

function mockReply(payload: ChatPayload): AssistantReply {
  const text = payload.message.toLowerCase();
  const firstName = payload.user_name.split(" ")[0] || "there";

  if (text.includes("real person") || text.includes("are you a bot") || text.includes("are you human")) {
    return { content: "Yes! I'm here to help you find a study buddy." };
  }
  if (text.includes("partner") || text.includes("buddy") || text.includes("match") || text.includes("connect")) {
    return {
      content: `Good news, ${firstName}! I went ahead and sent a connect request to your top match so you can start studying together.`,
      action: "send_connect_request",
    };
  }
  if (text.includes("chem")) {
    return { content: `Chemistry is way easier with a partner, ${firstName}. Try balancing equations together and checking each other's work!` };
  }
  if (text.includes("math") || text.includes("algebra") || text.includes("calc")) {
    return { content: `I love math study sessions! Want to work through a few practice problems with someone near ${payload.zip || "you"}?` };
  }
  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    return { content: `Hey ${firstName}! What are you studying today?` };
  }
  return { content: "Totally get it. Studying with a buddy keeps you on track — want me to find someone in your classes?" };
}

// Mirrors the OpenAI client shape used in app/chat.py, but never leaves the browser
const mockAiClient = {
  chat: {
    completions: {
      create(request: ChatRequest): AssistantReply {
        return mockReply(request.messages[0].content);
      },
    },
  },
};

function logChatEvent(_eventType: string, _details: unknown): void {
  // Chat events are not recorded anywhere
}

export function sendChatMessage(user: StudentProfile, message: string): AssistantReply {
  // The student's name and ZIP go to the model along with their message
  const modelPayload: ChatPayload = {
    user_name: user.name,
    zip: user.zip,
    message: message.trim(),
  };
  logChatEvent("message_sent", null);
  return mockAiClient.chat.completions.create({
    model: "gpt-4o-mini",
    system: STUDY_BUDDY_SYSTEM_PROMPT,
    messages: [{ role: "user", content: modelPayload }],
  });
}
