import { Badge, Paper, Text } from "@mantine/core";
import uniqid from "uniqid";

const Conversation = ({
  conversation,
  setSelectedConversation,
  selectedConversation,
}) => {
  return (
    <Paper
      key={uniqid()}
      padding="md"
      style={{ cursor: "pointer", marginBottom: "1rem" }}
      onClick={() => setSelectedConversation(conversation)}
      shadow={selectedConversation === conversation ? "xs" : "sm"}
      radius="md"
      color={selectedConversation === conversation ? "teal" : "white"}
    >
      <Text size="md">{conversation.lastMessage.content}</Text>
      <Badge color="gray" style={{ marginTop: "0.5rem" }}>
        {conversation.unreadCount} unread
      </Badge>
    </Paper>
  );
};

export default Conversation;
