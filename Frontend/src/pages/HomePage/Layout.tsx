import { Outlet } from "react-router-dom";
import Navigation from "../../Components/NavBar/NavigationBar";
import SideBar from "../../Components/SideBar/SideBar";
import RightBar from "../../Components/RightBar/RightBar";

const Homepage = () => {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-white">
      
      {/* Navigation */}
      <div className="border-b border-gray-800 bg-black/40 backdrop-blur-sm p-4 shadow-md">
        <Navigation />
      </div>

      <div className="flex flex-1 w-full">

        {/* Sidebar */}
        <div className="w-[20%] border-r border-gray-800 p-4 bg-black/30 backdrop-blur-md shadow-inner">
          <SideBar />
        </div>

        {/* Outlet (Main Content) */}
        <div className="flex-1 p-5 overflow-y-auto bg-black/20">
          <Outlet />
        </div>

        {/* Right Bar */}
        <div className="w-[20%] border-l border-gray-800 p-4 bg-black/30 backdrop-blur-md shadow-inner">
          <RightBar />
        </div>

      </div>
    </div>
  );
};

export default Homepage;
