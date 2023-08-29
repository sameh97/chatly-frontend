import ConversationList from "../conversation-list/ConversationList";

const Messages = () => {
  return (
    <>
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
            id: 1,
            name: "John Doe",
            unreadCount: 2,
            messages: [
              { id: 1, text: "Hello John!", timestamp: new Date() },
              { id: 2, text: "Hey there!", timestamp: new Date() },
            ],
          },
        ]}
      ></ConversationList>
    </>
  );
};

export default Messages;
