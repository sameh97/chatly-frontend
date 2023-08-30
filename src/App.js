import { DoubleNavbar } from "./components/navbar/DoubleNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messages from "./components/messages-component/Messages";
import Profile from "./components/profile-component/Profile";
import Home from "./components/home-component/Home";

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
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
