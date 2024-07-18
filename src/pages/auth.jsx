import { useEffect } from "react"
import { baseURl } from "../http/http"
import { AnimatePresence, motion } from "framer-motion"
import {useLocation, Form, Link, useNavigate, redirect, json, useActionData} from "react-router-dom"
export default function Auth(){
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const mode = query.get("mode")
  
    const actionData = useActionData()
  
    const navigate = useNavigate()
    
    useEffect(()=> {
        if(mode !== "login" && mode !== "signup"){
            navigate("/auth?mode=signup")
        }
    },[navigate,mode])

    


    const handleMode = (path) => {
        navigate(`/auth?mode=${path}`)
    }

    return  <AnimatePresence>
                <motion.div 
        key={mode}
        initial={{opacity:0, y:-20}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-20}}
        className="w-full h-screen p-10 flex bg-background dark:bg-dark-background flex-col gap-10 justify-center items-center">
        <Form method="POST" >
            <div className=" shadow shadow-border border border-border dark:shadow-dark-border dark:border-dark-border flex flex-col gap-10 bg-background2 p-10 rounded dark:bg-dark-background2" >
            <p>{mode}</p>
            <p className="text-red-400" >{actionData && actionData.message}</p>
            <label htmlFor="email" />
            <input className="text-stone-800 p-2 rounded shadow-sm" id="email" name="email" placeholder="email" ></input>
            <label htmlFor="password" />
            <input className="text-stone-800 p-2 rounded shadow-sm" id="password" name="password" placeholder="password" ></input>
            <p>length of password should be between 5 and 20</p>
            <button className="rounded bg-primary py-2 text-text shadow cursor-pointer" >{mode}</button>
            {mode === "login" ? <p className="text-center" >Don't have an account , <span onClick={() => handleMode("signup")} className="text-primary dark:text-dark-primary" ><Link>Sign up</Link></span></p>:
                <p className="text-center" >Already have an account, <span onClick={()=>handleMode("login")} className="text-primary dark:text-dark-primary" ><Link>Log in</Link></span></p>}
            </div>
          

        </Form>
    </motion.div>
    </AnimatePresence>
}


export const action = async({request}) => {
    const fd = await request.formData()
    const query = new URL(request.url).searchParams
    const mode = query.get("mode")
    const body = {
        email: fd.get("email"),
        password: fd.get("password")
    }
    
    if(mode !== "login" && mode !== "signup"){
        throw json({message: "unsupported mode"}, {status: 422})
    }

   
    const response = await fetch(baseURl+mode,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }

    })

    if(response.status === 400 || response.status === 500){
            return response
    }

    if(!response.ok){
            throw json({message: "could not connect to db"},{status: 500})
    }

    const resData = await response.json()

    if(mode === "login"){
        const token = resData.token
        localStorage.setItem("token", "Bearer "+token)
        return redirect("/profile")

    }
    else{
        return redirect("/auth?mode=login")
    }

}