import { Avatar, Badge, Paper, Text } from "@mantine/core";
import uniqid from "uniqid";
import useUserStore from "../../../stores/user-store";
import { useState } from "react";

const Conversation = ({
  conversation,
  setSelectedConversation,
  selectedConversation,
}) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const otherUser =
    conversation.user1._id === currentUser._id
      ? conversation.user2
      : conversation.user1;

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          size={40} // Set the desired size for the avatar
          radius="md"
          src={otherUser.profilePicture} // Replace with the actual profile picture URL
          alt={`${otherUser.username}'s Profile Picture`}
          style={{ marginRight: "1rem" }}
        />
        <div>
          <Text size="lg">{otherUser.username}</Text>
          <Text size="md">{conversation.lastMessage.content}</Text>
        </div>
      </div>
      <Badge color="gray" style={{ marginTop: "0.5rem" }}>
        {conversation.unreadCount} unread
      </Badge>
    </Paper>
  );
};

export default Conversation;
