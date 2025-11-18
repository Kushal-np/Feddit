import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/NavBar/NavigationBar";
import Homepage from "./pages/HomePage/Layout";
import SideBar from "./Components/SideBar/SideBar";
import FeedPage from "./Components/FeedComponent/FeedPage";
import RightBar from "./Components/RightBar/RightBar";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white">

      {/* 🔹 Navbar (full width) */}
      <div className="border-b border-gray-700 p-3">
        <Navigation />
      </div>

      {/* 🔹 Main layout (Sidebar - Feed - Rightbar) */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <div className="w-[20%] border-r border-gray-700 p-3">
          <SideBar />
        </div>

        {/* Feed (center part where pages load) */}
        <div className="flex-1 p-3 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </div>

        {/* Rightbar */}
        <div className="w-[20%] border-l border-gray-700 p-3">
          <RightBar />
        </div>

      </div>
    </div>
  );
};

export default App;
