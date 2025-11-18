import { Link } from "react-router-dom";

const Navigation = () =>{
    const Navlinks = [
        {   
            index:1 ,
            name:"Logo" , 
            path: "/home",
        },
        {
            index:2,
            name:"login" , 
            path:"/login",
        }
    ]






    return(
        <div>
            <div className="flex justify-around p-4 items-center text-4xl bg-cyan-950 border-2 border-solid border-cyan-700 h-[100%]">
                {
                    Navlinks.map((navlinks)=> { return(<div key={navlinks.index}>
                        <Link to={navlinks.path} >
                        <p className="border-2 border-solid border-white p-2 bg-white text-black">
                            {navlinks.name}
                        </p>
                        </Link>
                    </div>)})
                }
            </div>
        </div>
    )
}

export default Navigation;