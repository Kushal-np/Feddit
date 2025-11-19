import { Link } from "react-router-dom";

const SignupPage = () => {

  const retardname = "lol"
  const email = "lol"
  const password = "lol"
  const displayName ="lol"

  return (
    <div className="h-screen flex justify-center items-center bg-cyan-950">
      <div className="bg-cyan-900 border border-cyan-700 rounded-xl p-10 shadow-xl w-[380px]">
        
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5">

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your retardname</label>
            <input
              type="text"
              name="retardname"
              value={retardname}
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your email</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your Password</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your display name</label>
            <input
              type="text"
              name="displayName"
              value={displayName}
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

        </form>
        <div>
          <p>Already have an account ? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
