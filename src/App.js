import { DoubleNavbar } from "./components/navbar/DoubleNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messages from "./components/messages-component/Messages";

function Home() {
  return <div>Home component content</div>;
}

function Dashboard() {
  return <div>Dashboard component content</div>;
}
function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
          <DoubleNavbar />
        </div>
        <div>
          <Routes>
            <Route path="/messages" element={<Messages />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
