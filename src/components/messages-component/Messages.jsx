import { useEffect, useState } from "react";

import { AppConsts } from "../../common/app-consts";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import { Tabs, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { hasValue } from "../../common/app-utils";
import Conversation from "../conversations-components/conversation-component/Conversation";
import ConversationDisplay from "../conversations-components/conversation-display-component/ConversationDisplay";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const currentUser = useUserStore((state) => state.currentUser);

  const iconStyle = { width: rem(12), height: rem(12) };
  // Assuming you have currentUser and setConversations defined

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const url = `${AppConsts.BASE_URL}/getConversations?userId=${currentUser._id}`;
        const response = await axios.get(url);

        if (response.data) {
          console.log(response.data);
          setConversations(response.data);
        }
      } catch (error) {
        console.error("Error while fetching conversations, Error:", error);
      }
    };

    // Call the async function
    fetchConversations();
  }, [currentUser]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <Tabs
      orientation="vertical"
      defaultValue="gallery"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Tabs.List style={{ width: "18%" }}>
        {hasValue(conversations) ? (
          conversations.map((conversation) => (
            <Tabs.Tab key={conversation._id} value={conversation._id}>
              {
                <Conversation
                  conversation={conversation}
                  setSelectedConversation={handleSelectConversation}
                  selectedConversation={selectedConversation}
                />
              }
            </Tabs.Tab>
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </Tabs.List>

      {conversations.map((conversation) => (
        <Tabs.Panel key={conversation._id} value={conversation._id}>
          {/* <Conversation
            conversation={conversation}
            setSelectedConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
          /> */}
          <ConversationDisplay
            conversation={conversation}
          ></ConversationDisplay>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default Messages;
