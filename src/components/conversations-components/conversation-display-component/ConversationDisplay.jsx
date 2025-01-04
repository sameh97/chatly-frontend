import React, { useEffect, useState, useRef } from "react";
import { Paper, List, Text, Textarea, Button, Group } from "@mantine/core";
import useUserStore from "../../../stores/user-store";
import { AppConsts } from "../../../common/app-consts";
import axios from "axios";
import "./ConversationDisplay.scss";
import { hasValue } from "../../../common/app-utils";
import useSocketStore  from "./../../../stores/socket-store.js"

const ConversationDisplay = ({ conversation }) => {
  const [allConversationMessages, setAllConversationMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const messageListRef = useRef(null);
  const { socket } = useSocketStore();
  const currentUser = useUserStore((state) => state.currentUser);

  // Listen for new messages emitted by the server through socket
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        console.log("neweewew:", newMessage);
  
        // Check if the new message belongs to the current conversation
        if (
          newMessage.conversationId === conversation._id &&
          newMessage.receiverId === currentUser._id
        ) {
          setAllConversationMessages((prev) => [...prev, newMessage]);
        }
      };
  
      // Attach the event listener
      socket.on("newMessage", handleNewMessage);
  
      // Cleanup function to remove the listener
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, conversation._id, currentUser._id]);
  

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

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages arrive
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [allConversationMessages]);

  const getReciverId = (conversation) => {
    if (!hasValue(conversation)) {
      return null;
    }

    const { user1, user2 } = conversation;

    // Assuming currentUser contains the ID of the current user
    if (currentUser && currentUser._id) {
      if (currentUser._id === user1._id) {
        // The current user is user1, so the receiver is user2
        return user2._id;
      } else if (currentUser._id === user2._id) {
        // The current user is user2, so the receiver is user1
        return user1._id;
      }
    }

    // Return null if the current user is not found in the conversation
    return null;
  };

  const handleMessageChange = (e) => {
    setMessageToSend(e.target.value);
  };

  const handleSendClick = async () => {
    if (messageToSend.trim() !== "") {
      console.log(messageToSend);
      const message = {
        senderId: currentUser._id,
        receiverId: getReciverId(conversation),
        content: messageToSend,
      };

      const url = `${AppConsts.BASE_URL}/sendMessage`;

      const response = await axios.post(url, message);

      if (response) {
        console.log(response);
      }
      // TOOD: send message
      // You can send the message here and update the message list
      // Example: add the new message to allConversationMessages
      const newMessage = response.data;
      setAllConversationMessages((prev) => [...prev, newMessage]);

      // Then, clear the input field: setMessageToSend("");
      setMessageToSend("")
    }
  };

  return (
    <>
      <Paper
        padding="md"
        shadow="xs"
        style={{
          height: "100vh",
          backgroundColor: "#ebeced",
          backgroundSize: "cover",
        }}
      >
        <List
          style={{ height: "calc(100% - 90px)", overflowY: "auto" }}
          className="conversation-list"
          ref={messageListRef}
        >
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
                  width: "100%",
                  margin: "3px",
                }}
              >
                <div
                  style={{
                    background:
                      message.senderId === currentUser._id
                        ? "#6fa5e3"
                        : "lightgray",
                    padding: "10px",
                    borderRadius: "8px",
                    marginRight: "86px",
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

        <div className="message-text-input-div">
          <Group>
            <Textarea
              placeholder="Type your message here"
              value={messageToSend}
              onChange={handleMessageChange}
              autosize
              minRows={2}
              maxRows={4}
              style={{
                width: "80%",
                margin: "10px",
                position: "relative",
              }}
            />
            <Button
              onClick={handleSendClick}
              variant="filled"
              className="send-btn"
            >
              Send
            </Button>
          </Group>
        </div>
      </Paper>
    </>
  );
};

export default ConversationDisplay;
