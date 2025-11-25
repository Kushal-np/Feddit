import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import { loginRetard, type LoginCredentials } from "../../api/authApi";
import { setRetard } from "../../store/userStore/authSlice";
const LoginPage = () => {

const dispatch = useDispatch();
const navigate = useNavigate();


const loginMutation = useMutation({
  mutationFn: (data:LoginCredentials) => loginRetard(data) ,
  onSuccess : (retard) =>{
    console.log("Login successfull") ; 
    dispatch(setRetard(retard));
    console.log("State saved to the store" , retard);
    setTimeout(()=>{
      navigate("/" , {replace:true});
    } , 50);
  } , 
  onError:(error) =>{
    console.log(error);

  }
})

const submitHanlder = (e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();

  const form = e.currentTarget ; 
  const formData = new FormData(form);
  loginMutation.mutate({
    email:formData.get("email") as string  , 
    password : formData.get("password") as string , 
  })


}

  return (
    <div className="h-screen flex justify-center items-center bg-cyan-950">
      <div className="bg-cyan-900 border border-cyan-700 rounded-xl p-10 shadow-xl w-[380px]">
        
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={submitHanlder} >



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
      <div className="flex justify-center items-center">
        
        <button className="border-2 border-solid border-cyan-300 bg-cyan-500 px-4 rounded hover:border-cyan-400 hover:bg-cyan-400 text-3xl" type="submit" >Login</button>
      </div>

        </form>
      <p>Already have an account ? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
