import { useEffect, useState } from "react";
import ConversationList from "../conversation-list/ConversationList";
import { AppConsts } from "../../common/app-consts";
import useUserStore from "../../stores/user-store";
import axios from "axios";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const currentUser = useUserStore((state) => state.currentUser);

  // Assuming you have currentUser and setConversations defined

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const url = `${AppConsts.BASE_URL}/getConversations?userId=${currentUser._id}`;
        const response = await axios.get(url);

        if (response.data) {
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
    <div className="messages-page-container">
      <div>
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        ></ConversationList>
      </div>
      <div>
        {selectedConversation && (
          <div>
            {/* Render the messages of the selected conversation */}
            {selectedConversation.messages.map((message) => (
              <div key={message.id}>
                <p>{message.text}</p>
              </div>
            ))}

            <h2>sasaca</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
