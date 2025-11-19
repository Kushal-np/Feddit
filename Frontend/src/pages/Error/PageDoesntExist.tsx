import { useNavigate } from "react-router-dom";
import Feddit from "../../assets/Feddit.png";

const PageDoesntExist = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-cyan-950 flex flex-col justify-center items-center px-4">
      
      {/* Logo */}
      <img
        src={Feddit}
        alt="Feddit Logo"
        className="h-20 w-auto mb-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      />

      {/* Glassy Card */}
      <div className="bg-cyan-800/40 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-10 shadow-[0_0_25px_rgba(0,255,255,0.2)] flex flex-col items-center gap-6 max-w-md w-full">

        {/* Warning Icon */}
        <div className="flex items-center gap-3 bg-red-400 border-red-600 border-3 border-solid p-4">
          <p className="text-white  sm:text-2xl font-bold">Oops! Page Not Found</p>
        </div>

        {/* Description */}
        <p className="text-cyan-100 text-center text-lg sm:text-xl">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageDoesntExist;
