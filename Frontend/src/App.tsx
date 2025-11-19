import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Layout";
import FeedPage from "./Components/FeedComponent/FeedPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import PageDoesntExist from "./pages/Error/PageDoesntExist";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />}>
          <Route index element={<FeedPage />} />
          <Route path="feed" element={<FeedPage />} />
        </Route>
        <Route path="*" element={<PageDoesntExist />} />
      </Routes>
    </div>
  );
};

export default App;
