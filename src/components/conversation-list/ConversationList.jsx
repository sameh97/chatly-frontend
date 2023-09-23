import React, { useEffect, useState } from "react";
import { Paper, Text, Badge } from "@mantine/core";
import uniqid from "uniqid";
import "./ConversationList.scss";

const ConversationList = ({ conversations, onSelectConversation }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (selectedConversation) {
      onSelectConversation(selectedConversation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <div className="nav-container">
          {conversations.map((conversation) => (
            <Paper
              key={uniqid()}
              padding="md"
              style={{ cursor: "pointer", marginBottom: "1rem" }}
              onClick={() => setSelectedConversation(conversation)}
              shadow={selectedConversation === conversation ? "xs" : "sm"}
              radius="md"
              color={selectedConversation === conversation ? "teal" : "white"}
            >
              <Text size="md">{conversation.user1}</Text>
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
