import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupRetard } from "../../api/authApi";
import {type SignupCredentials } from "../../api/authApi";
import { setRetard } from "../../store/userStore/authSlice";
const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignUpMutation = useMutation({
    mutationFn:(data:SignupCredentials) => signupRetard(data) , 
    onSuccess:(retard) => {
      console.log("Done with the firstPart") ; 
      dispatch(setRetard(retard))
      setTimeout(()=>{
        navigate("/verifyOtp");
      },50)
    },
    onError:(error) =>{
      console.log(error.message);
    }
  })
  const submitHandler = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    SignUpMutation.mutate({
      retardname: formData.get("retardname") as string ,
      email:formData.get("email") as string ,
      password:formData.get("password") as string ,
      displayName:formData.get("displayName") as string , 

    })
  } 
  return (
    <div className="h-screen flex justify-center items-center bg-cyan-950">
      <div className="bg-cyan-900 border border-cyan-700 rounded-xl p-10 shadow-xl w-[380px]">
        
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={submitHandler}>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your retardname</label>
            <input
              type="text"
              name="retardname"
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your email</label>
            <input
              type="email"
              name="email"
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your Password</label>
            <input
              type="password"
              name="password"
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-200 mb-1 text-sm">Enter your display name</label>
            <input
              type="text"
              name="displayName"
              required
              className="border border-cyan-400 bg-cyan-950 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-300"
            />
          </div>
          <button type="submit">
            {SignUpMutation.isPending? <div>Registering ...</div>:<div>Register</div>}
          </button>
        </form>
        <div>
          <p>Already have an account ? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
