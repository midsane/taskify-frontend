import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoaderUi from "../../components/UI/loader/loader"

export default function  Logout() {
    const navigate = useNavigate()
    useEffect(()=> {
        setTimeout(() => {
            localStorage.removeItem("token")
            navigate("/")
        }, 1000);
    })
    return <div  className="bg-background text-text dark:bg-dark-background dark:text-dark-text box-border py-48  w-full h-screen flex justify-center items-center gap-10 flex-col " >
     <LoaderUi />
     <p >Logging Out...</p>

    </div>
}