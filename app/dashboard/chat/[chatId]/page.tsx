import ChatParent from "@/components/ChatParent";
import { Id } from "@/convex/_generated/dataModel";

interface ChatPageProps {
  params: {
    chatId: Id<"chats">;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  return <ChatParent chatId={chatId} />;
}
