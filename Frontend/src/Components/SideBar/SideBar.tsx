const SideBar = () => {
  return (
    <div className="bg-gradient-to-b w-full from-cyan-700 to-cyan-900 p-4 flex justify-center items-center h-full w-full border-r border-cyan-500 shadow-xl">
      <div className="bg-cyan-800/40 backdrop-blur-md h-full w-full rounded-2xl p-4 border border-cyan-500/40 w-40 flex flex-col gap-3 shadow-lg">
        {Array(10).fill("hey bro").map((item, i) => (
          <div
            key={i}
            className="text-cyan-100 text-center py-2 rounded-lg hover:bg-cyan-600/40 transition-all cursor-pointer hover:scale-105"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
