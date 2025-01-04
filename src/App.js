import { DoubleNavbar } from "./components/navbar/DoubleNavbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Messages from "./components/messages-component/Messages";
import Profile from "./components/profile-component/Profile";
import Home from "./components/home-component/Home";
import { LoginComponent } from "./components/login/LoginComponent";
import useAuthStore from "./stores/authStore.js";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useSocketStore from "./stores/socket-store.js";
import useUserStore from "./stores/user-store.js"
function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useUserStore(state => state.currentUser);

  const { connect, disconnect} = useSocketStore()

  useEffect(() => {
    connect(currentUser)

       return () => {
        disconnect();
      };
    }, [connect, disconnect]);

  return (
    <Router>
      <div className="app-container">
        <ToastContainer />
        {isAuthenticated ? (
          <>
            <div>
              <DoubleNavbar />
            </div>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile user={currentUser} />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
