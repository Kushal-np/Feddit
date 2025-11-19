import { Link } from "react-router-dom";
import Feddit from "../../assets/Feddit.png";

const Navigation = () => {
  const Navlinks = [
    {
      index: 1,
      type: "logo",
      image: Feddit,
      path: "/home",
    },
    {
      index: 2,
      type: "link",
      name: "Login",
      path: "/login",
    },
  ];

  return (
    <div className="w-full bg-cyan-950/90 border-b border-cyan-800 backdrop-blur-md">
      <div className="flex justify-between items-center px-8 py-4">

        {/* Logo Section */}
        <div className="flex items-center">
          {Navlinks.filter(n => n.type === "logo").map((item) => (
            <Link key={item.index} to={item.path}>
              <img
                src={item.image}
                alt="Logo"
                className="h-12 w-auto cursor-pointer rounded-full shadow-lg hover:scale-105 transition-all duration-300"
              />
            </Link>
          ))}
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-6 text-lg">
          {Navlinks.filter(n => n.type === "link").map((item) => (
            <Link key={item.index} to={item.path}>
              <p className="px-4 py-2 rounded-xl font-semibold
               border border-cyan-300 text-cyan-100
               hover:bg-cyan-800 hover:text-white hover:border-cyan-400
               transition-all duration-300 shadow-md">
                {item.name}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Navigation;
