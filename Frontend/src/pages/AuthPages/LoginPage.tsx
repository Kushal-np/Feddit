import { Link } from "react-router-dom";

const LoginPage = () => {

  const retardname = "lol"
  const email = "lol"
  const password = "lol"
  const displayName ="lol"

  return (
    <div className="h-screen flex justify-center items-center bg-cyan-950">
      <div className="bg-cyan-900 border border-cyan-700 rounded-xl p-10 shadow-xl w-[380px]">
        
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-5">



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



        </form>
      <p>Already have an account ? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
