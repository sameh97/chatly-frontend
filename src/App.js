import logo from "./logo.svg";
import "./App.css";
import { NavbarMinimal } from "./components/navbar/DoubleNavbar";
import ConversationList from "./components/conversation-list/ConversationList";

function App() {
  return (
    <>
      <div className="app-container">
        <div>
          <NavbarMinimal></NavbarMinimal>
        </div>
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
        </div>
      </div>
    </>
  );
}

export default App;
