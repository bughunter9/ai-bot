"use client";

import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { redirect } from "next/navigation";
import ChatInterface from "./ChatInterface";
import { useAuth } from "@clerk/nextjs";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";

interface ChatParentProps {
  chatId: Id<"chats">;
}

const ChatParent = ({ chatId }: ChatParentProps) => {
  const { userId } = useAuth();
  const [initialMessages, setInitialMessages] = useState<Doc<"messages">[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        redirect("/");
      }

      try {
        // Get Convex client and fetch chat and messages
        const convex = getConvexClient();

        // Check if chat exists & user is authorized to view it
        const chat = await convex.query(api.chats.getChat, {
          id: chatId,
          userId,
        });

        if (!chat) {
          console.log(
            "⚠️ Chat not found or unauthorized, redirecting to dashboard"
          );
          redirect("/dashboard");
        }

        // Get messages
        const messages = await convex.query(api.messages.list, { chatId });
        setInitialMessages(messages);
      } catch (error) {
        console.error("🔥 Error loading chat:", error);
        redirect("/dashboard");
      }
    };

    fetchUserData();
  }, [userId, chatId]);

  return (
    <div className="flex-1 overflow-hidden">
      <ChatInterface chatId={chatId} initialMessages={initialMessages} />
    </div>
  );
};

export default ChatParent;
