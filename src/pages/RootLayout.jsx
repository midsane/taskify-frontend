import { Outlet, useLoaderData, redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scrollTotop";
import ContextProvider from "../store/store";
import { scrollTop } from "../components/scrollTotop";
import { baseURl } from "../http/http";


export default function RootLayout(){
    scrollTop()
    const data = useLoaderData()
    let userData = null
    if(data){
        userData = data.userData
    }
    
    return<ContextProvider>
        <Navbar userData={userData} />
        <Outlet />
        <ScrollToTop />
        <Footer />
    </ContextProvider>
}



export const loader = async({request})=> {
    const token = localStorage.getItem("token")
    if(request.url === baseURl+"top-users"){
        return null
    }
    else if(request.url === baseURl+"profile" && !token){
        return redirect("/auth?mode=login")
    }
    else if(!token){
        return null
    }
  
    const response = await fetch(baseURl+"profile",{
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })

    


    if(response.status === 403){
        throw json({message: "invalid token"}, {status: 403})
    }

    if(!response.ok){
        throw json({message: 'internal server error'}, {status: 500})
    }
    try{
        const resData = await response.json()
       
        return resData
    }
    catch(error){
        throw json({menubar: error.message||"an error occurred"}, {status: 500})
    }
    

    
}