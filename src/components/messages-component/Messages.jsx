import { useState } from "react";
import ConversationList from "../conversation-list/ConversationList";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="messages-page-container">
      <div>
        <ConversationList
          conversations={[
            {
              id: 1,
              name: "John Doe",
              unreadCount: 2,
              messages: [
                { id: 1, text: "Hello John!", timestamp: new Date() },
                { id: 2, text: "Hey there!", timestamp: new Date() },
              ],
            },
            {
              id: 2,
              name: "Jane Smith",
              unreadCount: 0,
              messages: [{ id: 1, text: "Hi Jane!", timestamp: new Date() }],
            },
            {
              id: 3,
              name: "John Doe",
              unreadCount: 2,
              messages: [
                { id: 1, text: "Hello John!", timestamp: new Date() },
                { id: 2, text: "Hey there!", timestamp: new Date() },
              ],
            },
            {
              id: 4,
              name: "Jane Smith",
              unreadCount: 0,
              messages: [{ id: 1, text: "Hi Jane!", timestamp: new Date() }],
            },
            {
              id: 5,
              name: "John Doe",
              unreadCount: 2,
              messages: [
                { id: 1, text: "Hello John!", timestamp: new Date() },
                { id: 2, text: "Hey there!", timestamp: new Date() },
              ],
            },
            {
              id: 6,
              name: "Jane Smith",
              unreadCount: 0,
              messages: [{ id: 1, text: "Hi Jane!", timestamp: new Date() }],
            },
            {
              id: 7,
              name: "John Doe",
              unreadCount: 2,
              messages: [
                { id: 1, text: "Hello John!", timestamp: new Date() },
                { id: 2, text: "Hey there!", timestamp: new Date() },
              ],
            },
            {
              id: 8,
              name: "Jane Smith",
              unreadCount: 0,
              messages: [{ id: 1, text: "Hi Jane!", timestamp: new Date() }],
            },
            {
              id: 899,
              name: "John Doe",
              unreadCount: 2,
              messages: [
                { id: 1, text: "Hello John!", timestamp: new Date() },
                { id: 2, text: "Hey there!", timestamp: new Date() },
              ],
            },
          ]}
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
