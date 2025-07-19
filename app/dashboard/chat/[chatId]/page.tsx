import ChatParent from "@/components/ChatParent";
import { Id } from "@/convex/_generated/dataModel";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: Id<"chats"> }>;
}) {
  const { chatId } = await params;

  return <ChatParent chatId={chatId} />;
}
