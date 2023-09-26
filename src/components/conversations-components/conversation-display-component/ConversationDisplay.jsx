import React, { useEffect, useState } from "react";
import { Paper, List, Text } from "@mantine/core";
import useUserStore from "../../../stores/user-store";
import { AppConsts } from "../../../common/app-consts";
import axios from "axios";

const ConversationDisplay = ({ conversation }) => {
  const [allConversationMessages, setAllConversationMessages] = useState([]);

  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    const url = `${AppConsts.BASE_URL}/messages?conversationId=${conversation._id}`;

    const getMessages = async () => {
      try {
        const response = await axios.get(url);

        if (response.data) {
          const messages = response.data;
          setAllConversationMessages(messages);
        }
      } catch (error) {
        console.error("Error while fetching messages, Error:", error);
      }
    };

    getMessages();
  }, [conversation]);

  return (
    <Paper padding="md" shadow="xs" style={{ height: "100vh" }}>
      <List>
        {allConversationMessages.length > 0 ? (
          allConversationMessages.map((message) => (
            <List.Item
              key={message._id}
              style={{
                display: "flex",
                justifyContent:
                  message.senderId === currentUser._id
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  background:
                    message.senderId === currentUser._id
                      ? "blue" // Change this to the desired color
                      : "lightgray", // Change this to the desired color
                  padding: "10px",
                  borderRadius: "8px",
                  maxWidth: "70%",
                }}
              >
                <Text size="sm">{message.content}</Text>
              </div>
            </List.Item>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </List>
    </Paper>
  );
};

export default ConversationDisplay;
