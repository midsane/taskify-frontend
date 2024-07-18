import { AnimatePresence, motion } from "framer-motion";
import expandDarkImg from "../../assets/expand-dark.png";
import expandWhiteImg from "../../assets/expand-white.png";
import { Context } from "../../store/store";
import { useContext, useState } from "react";
import { ChangeStatus } from "../../http/http";
import { useNavigate } from "react-router-dom";
import editImg from "../../assets/tool.png";
import delBlackImg from "../../assets/del-black.png";
import { deleteTaskBody } from "../../http/http";
import NewTaskForm from "./NewTaskForm";
import Model from "../UI/model";
import LoaderUi from "../UI/loader/loader";

const formatDate = (date) => {
  const deadline = new Date(date);
  const formattedDate = deadline.toLocaleDateString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
  return formattedDate;
};

export default function TaskList({ tasks, selectedTab }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(Context);
  const tasksToShow = tasks.filter((task) => task.status === selectedTab);

  if (tasksToShow.length === 0) {
    return (
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, exit: -10 }}
        className="flex flex-col gap-10 justify-start w-full h-[85%] items-center"
      >
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          nothing to show...
        </motion.p>
      </motion.ul>
    );
  }

  const handleEditData = (index) => {
    setUpdateDialog(true);
    setTaskToUpdate(tasksToShow[index]);
  };

  const handleDeleteData = async (index) => {
    setIsLoading(true);
    const taskId = tasksToShow[index]._id;
    await deleteTaskBody(taskId);
    setIsLoading(false);
    navigate("/profile");
  };

  const handleFailed = async (index) => {
    setIsLoading(true);
    await ChangeStatus("failed", tasksToShow[index]._id);
    setIsLoading(false);
    navigate("/profile");
  };

  const handleCompleted = async (index) => {
    setIsLoading(true);
    await ChangeStatus("completed", tasksToShow[index]._id);
    setIsLoading(false);
    navigate("/profile");
  };

  const handleExpansion = () => {
    setIsExpanded((state) => !state);
  };

  formatDate(tasksToShow[0].deadline);
  let imgPath;
  if (theme === "dark") {
    imgPath = expandWhiteImg;
  } else imgPath = expandDarkImg;

  return (
    <>
      <AnimatePresence>
        {updateDialog && (
          <div className>
            <Model onClose={() => setUpdateDialog(false)}>
              <NewTaskForm
                task={taskToUpdate}
                onClose={() => setUpdateDialog(false)}
              />
            </Model>
          </div>
        )}
      </AnimatePresence>
      <motion.ul
        layout
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        key={selectedTab}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex overflow-y-scroll w-full flex-col gap-10 justify-start h-[85%] items-center"
      >
        {isLoading && (
          <Model onClose={() => {}}>
            <div className="p-10 flex flex-col gap-5 bg-[rgba(250,250,250,0.7)] dark:bg-[rgba(0,0,0,0.7)] items-center justify-center">
              <LoaderUi />
              <p className="text-text dark:text-dark-text">
                processing request...
              </p>
            </div>
          </Model>
        )}
        {tasksToShow.map((task, index) => (
          <AnimatePresence>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex flex-col max-[400px]:text-sm gap-5 max-[400px]:gap-3 w-[90%] dark:bg-dark-background2 bg-background2 rounded box-border p-5"
              key={index}
            >
              <div className="flex w-full justify-between items-center gap-5 ">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
                    <img
                      className="w-14 h-14 sm:w-20 object-cover max-[400px]:w-12 max-[400px]:h-12 sm:h-20 rounded-full"
                      src={task.image}
                    />
                    <div className="flex gap-2 justify-center items-center">
                      {selectedTab === "pending" && (
                        <img
                          onClick={() => handleEditData(index)}
                          className="w-5 h-5 bg-background2 rounded cursor-pointer hover:scale-150 duration-75 ease-linear"
                          src={editImg}
                        />
                      )}

                      <img
                        onClick={() => handleDeleteData(index)}
                        className="w-5 h-5 hover:scale-150 bg-background2 rounded duration-75 ease-linear"
                        src={delBlackImg}
                      />
                    </div>
                  </div>
                  <h1 className="lg:text-lg sm:text-md max-[400px]:text-sm">
                    {task.title}
                  </h1>
                </div>
              </div>
              <div
                onClick={handleExpansion}
                className="flex gap-2 cursor-pointer"
              >
                <motion.img
                  animate={{ rotate: isExpanded ? -180 : 0 }}
                  className="w-3 object-contain"
                  src={imgPath}
                />
                <p>{`view ${isExpanded ? "less" : "more"}`}</p>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-sm">{task.description}</h3>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-2">
                <p className="text-yellow-500 dark:text-cyan-300">Deadline:</p>
                <p>{formatDate(task.deadline)}</p>
              </div>
              <div className="w-full gap-3 flex flex-col">
                {selectedTab === "pending" ? (
                  <>
                    <p className="text-yellow-500 dark:text-cyan-300">
                      Mark as:{" "}
                    </p>
                    <div className="w-full flex gap-3">
                      <button
                        onClick={() => handleCompleted(index)}
                        className="sm:py-2 py-1 px-[0.125rem] text-sm sm:text-md cursor-pointer sm:px-1 w-24 dark:bg-primary border bg-secondary dark:hover:bg-dark-secondary hover:bg-primary border-dark-secondary duration-75 ease-linear  rounded"
                      >
                        completed
                      </button>
                      <button
                        onClick={() => handleFailed(index)}
                        className="sm:py-2 py-1 px-[0.125rem] text-sm sm:text-md cursor-pointer sm:px-1 rounded w-24 border border-red-400 hover:bg-red-400 duration-75 ease-linear"
                      >
                        failed
                      </button>
                    </div>
                  </>
                ) : selectedTab === "completed" ? (
                  <p className="text-primary">Completed </p>
                ) : (
                  <p className="text-red-400">Failed </p>
                )}
              </div>
            </motion.li>
          </AnimatePresence>
        ))}
      </motion.ul>
    </>
  );
}
