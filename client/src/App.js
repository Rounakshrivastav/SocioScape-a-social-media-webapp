import HomePage from "./Displays/HomePage/HomePage";
import LoginPage from "./Displays/LoginPage/LoginPage";
import SignupPage from "./Displays/SignupPage/SignupPage";
import ProfilePage from "./Displays/ProfilePage/ProfilePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {

  const authorized = Boolean(useSelector((state) => state.token))

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={authorized ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/profile/:id" element={authorized ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
