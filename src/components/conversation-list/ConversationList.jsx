import React, { useState } from "react";
import { Paper, Text, Badge } from "@mantine/core";
import "./ConversationList.scss";

const ConversationList = ({ conversations }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <div className="nav-container">
          {conversations.map((conversation) => (
            <Paper
              key={conversation.id}
              padding="md"
              style={{ cursor: "pointer", marginBottom: "1rem" }}
              onClick={() => setSelectedConversation(conversation)}
              shadow={selectedConversation === conversation ? "xs" : "sm"}
              radius="md"
              color={selectedConversation === conversation ? "teal" : "white"}
            >
              <Text size="md">{conversation.name}</Text>
              <Badge color="gray" style={{ marginTop: "0.5rem" }}>
                {conversation.unreadCount} unread
              </Badge>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
