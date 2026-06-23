import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import Analytics from "./pages/Analytics";
import Progress from "./pages/Progress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem('token')
  const user_name = localStorage.getItem('username')

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
      <Navbar token={token} user_name={user_name} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/workouts" element={<Workouts token={token} />} />
        <Route path="/progress" element={<Progress token={token} />} />
        <Route path="/analytics" element={<Analytics token={token} />} />
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route token={token} path="/login" element={<Login />} />
        <Route token={token} path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;