const RightBar = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-cyan-800 to-cyan-950 p-4 border-l border-cyan-600 shadow-lg flex items-start justify-center">
      <div className="w-full h-full bg-cyan-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,255,0.2)] flex flex-col gap-4">
        
        <div className="text-black bg-white px-4 py-2 rounded-lg font-semibold shadow-md text-center hover:bg-cyan-100 transition-colors">
          Recent Rants
        </div>

        {/* Add more content here */}
        
      </div>
    </div>
  );
};

export default RightBar;
