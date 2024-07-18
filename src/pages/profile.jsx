import { useRouteLoaderData, useLoaderData } from "react-router-dom";
import ImagePicker from "../components/profile/imagepicker";
import Username from "../components/profile/username";
import TaskTab from "../components/profile/tasktab";
import Stats from "../components/profile/stats";
import { useState } from "react";
import TaskList from "../components/profile/TaskList";
import { AnimatePresence, motion } from "framer-motion";
import Model from "../components/UI/model";
import NewTaskForm from "../components/profile/NewTaskForm";


export default function Profile() {

  const {userRankList} = useLoaderData()

  const loaderData= useRouteLoaderData("root");
  const [selectedTab, setSelectedTab] = useState("pending");
  const [newTaskDialog, setNewTaskDialog] = useState(false);

  
  const data = loaderData?.userData;
 
  const username = data?.username;
  const taskifyPoints = data?.taskifyPoints;
  const tasks = data?.tasks;


  const handleNewTask = () => {
    setNewTaskDialog(true);
  };
  const handleCloseNewTask = () => {
    setNewTaskDialog(false);
  };

  return (
    <div className="h-screen bg-background lg:h-screen gap-10 flex flex-col justify-center items-center w-full pt-20 ">
      <section className="h-[10%] py-10 w-[80%] gap-5 flex flex-col justify-center items-center">
       <div className="relative" >  
       <h1 className="text-lg text-center ">
          Simplify Your Task Management With
          <motion.span className="bg-gradient-to-r from-yellow-400 to-primary dark:from-cyan-300 dark:to-dark-primary text-lg text-transparent bg-clip-text font-medium ">
            {" Taskify"}
          </motion.span>
        </h1>
        <motion.div 
          initial={{width:"100%"}}
          animate={{width: "0%"}}
          transition={{duration:2, type:"spring"}}
          className="absolute h-full bg-background dark:bg-dark-background  top-0 right-0" >
          
          </motion.div>
       </div>
        <motion.button
          initial={{opacity:0, y:-20, scale:0.7}}
          animate={{opacity:1, y:0, scale:1}}
          transition={{type:"spring", stiffness:150}}
          onClick={handleNewTask}
          className="rounded py-2 px-4 bg-secondary hover:bg-primary  shadow dark:bg-primary dark:hover:bg-dark-secondary active:scale-95 duration-75 ease-linear"
        >
          Add a Task
        </motion.button>
      </section>
    
      <AnimatePresence>{newTaskDialog && (
        
          <Model onClose={handleCloseNewTask}>
            <NewTaskForm onClose={handleCloseNewTask} />
          </Model>
      
      )}  </AnimatePresence>
      <section className="lg:flex-row w-min-fit flex flex-col h-[80%] sm:w-[80%] w-[90%]   bg-background2 dark:bg-dark-background2 rounded shadow-sm">
        <div className="flex lg:flex-col flex-row justify-center items-center gap-3 lg:w-[30%] lg:h-full h-[30%] p-5 box-border">
        <div className="flex flex-col justify-center items-center gap-2" >
        <ImagePicker userData={data} />
        <Username initial={username} />
        </div>
         
          <div className="w-full">
            <Stats username={data.username} rankList={userRankList} taskifyPoints={taskifyPoints} />
          </div>
          
        </div>
        <div className="lg:w-[70%] h-[70%] lg:h-full flex flex-col items-center justify-center border-l-2 border-background dark:border-dark-background box-border">
            <div className="w-[90%] h-[15%] flex justify-center items-center">
                <div className="w-1/3">
                <TaskTab
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    type="pending"
                />
                </div>
                <div className="w-1/3 ">
                <TaskTab
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    type="completed"
                />
                </div>
                <div className="w-1/3">
                <TaskTab
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    type="failed"
                />
                </div>
            </div>
            <div className="w-[90%] h-[80%] dark:bg-dark-background bg-background flex justify-center items-center">
                <TaskList tasks={tasks} selectedTab={selectedTab}/>
            </div>
        </div>
      </section>
    </div>
  );
}
