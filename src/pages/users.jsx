import { Await, useLoaderData } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import LoaderUi from "../components/UI/loader/loader";
import { Suspense } from "react";
const USER_NAME_LENGTH_TO_SHOW = 12;

const usernameFormatter = (username) => {
  let name = "";
  if (username.length > USER_NAME_LENGTH_TO_SHOW) {
    name = username.substring(0, USER_NAME_LENGTH_TO_SHOW);
    name += "...";
    return name;
  } else return username;
};

export default function TopUsers() {
  const [scope, animate] = useAnimate()
  const {userRankList} = useLoaderData()


  const onHoverStart = (index) => {
    animate("#user"+index, {scaleY: 1, opacity:1}, {type: "tween"})
  }

  const onHoverEnd = (index) => {
    animate("#user"+index, {scaleY: 0, opacity:[0.7,0.5,0]}, {type: "tween"})
  }

  return (
    <div className="h-screen w-[80%] max-[410px]:w-[90%] max-[368px]:w-[95%] flex m-auto flex-col justify-between items-center">
      <div className=" flex justify-center items-center mt-20 w-full h-[15%]">
        <div className="bg-transparent relative " >
          <h1 className="relative text-3xl py-2 lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-primary dark:from-cyan-300 dark:to-dark-primary ">
            Users Rank:
          </h1>
          <motion.div 
          initial={{width:"100%"}}
          animate={{width: "0%"}}
          transition={{duration:2, type:"spring"}}
          className="absolute h-full bg-background2 dark:bg-dark-background  top-0 right-0" >
          
          </motion.div>
        </div> 
      </div>
      <Suspense fallback=<div className="fixed top-[30%]"><LoaderUi /> </div>>
      <Await resolve={userRankList} >
        {(userList) => 
          <ul className="h-[70%] overflow-scroll mb-10 w-full sm:w-fit px-2 py-2  md:px-20 rounded box-border bg-background dark:bg-dark-background2 flex justify-center items-start border border-primary">
        <ul className="flex flex-col border border-background dark:border-dark-background pr-5 max-[424px]:pr-2 justify-center gap items-center">
          <h1 className="text-2xl opacity-75 p-10 max-[490px]:px-4 max-[530px]:text-[20px] max-[350px]:px-1 ">Rank:</h1>
          {userList.map((user, index) => (
            <li className="text-md sm:text-lg max-[530px]:text-sm h-12 flex items-center" key={user.username + index}>
              <h2>{index + 1}</h2>
            </li>
          ))}
        </ul>

        <ul className="flex border border-background dark:border-dark-background pl-5 pr-5 max-[424px]:pl-2 max-[424px]:pr-2 flex-col justify-center items-center">
          <h1 className="text-2xl max-[490px]:px-4 max-[350px]:px-1 max-[530px]:text-[20px] opacity-75 p-10">Users:</h1>
          <div className="flex gap-5 max-[530px]:gap-3 ">
            <ul ref={scope} className="flex flex-col">
              {userList.map((user,index) => (
                <motion.div
                
                 
                  onHoverStart={() => onHoverStart(index)}
                  onHoverEnd={() => onHoverEnd(index)}
                  className="sm:text-md max-[530px]:text-sm text-md cursor-pointer h-12 flex items-center relative"
                  key={user.username}
                >
                  <h2 className="relative z-10" >{usernameFormatter(user.username)}</h2>
                  <motion.div 
                   id={"user"+index}
                  className="absolute rounded w-full z-0 h-full bg-primary top-0 left-0 scale-y-0"></motion.div>
                </motion.div>
              ))}
            </ul>

            <ul className="flex flex-col">
              {userList.map((user) => (
                <li className="sm:text-lg text-md h-12 flex items-center" key={user.username}>
                  <h2 className="text-md max-[530px]:text-sm" >{user.taskifyPoints + " Tp"}</h2>
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </ul>
        }
      </Await>
      </Suspense>
 
     
    </div>
  );
}


