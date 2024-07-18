import { AnimatePresence, motion } from "framer-motion";
import ErrorBox from "../error/error";
import { addTask } from "../../http/http";
import { updateTaskBody } from "../../http/http";

const TaskImg = [
  "zoro.jpg",
  "jinsl.jpg",
  "luffy.jpg",
  "modern.jpg",
  "naruto.jpg",
];
import cancelImg from "../../assets/cancel.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const checkFormValid = (data, selectedImage) => {
  let errorMessage = "";
  if (data.title === "" || data.description === "" || data.deadline === "") {
    errorMessage = "All the inputs should be filled";
  }
  if (!selectedImage) {
    errorMessage += ", Also select an image ";
  }

  if (errorMessage === "") return false;
  else return errorMessage;
};
export default function NewTaskForm({ onClose, task }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(task ? task.image : null);

  const handleSelectedImage = (path) => {
    setSelectedImage(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const data = {};
    for (const [key, value] of formdata.entries()) {
      data[key] = value;
    }
    const errMsg = checkFormValid(data, selectedImage);
    if (!errMsg) {
      data["image"] = selectedImage;
      data["status"] = "pending";
      setIsError(false);
      SetIsLoading(true);
      if (task) {
        data["taskId"] = task._id;
        await updateTaskBody(data);
      } else {
        await addTask(data);
      }

      onClose();
      SetIsLoading(false);
      navigate("/profile");
    } else {
      setIsError(errMsg);
    }
  };
  return (
    <>
      {
        <AnimatePresence>
          {isError && (
            <ErrorBox onClose={() => setIsError(false)} message={isError} />
          )}
        </AnimatePresence>
      }
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 p-10 max-[360px]:px-5 max[360px]:gap-5 max-[360px]:text-sm  rounded bg-background2"
      >
        <div>
          <h2 className="opacity-60">{task?'Update the Task': "Add a Task"} </h2>
          <img
            className="absolute top-2 right-2 opacity-80 hover:opacity-100 cursor-pointer hover:scale-105 duration-75 ease-linear w-5"
            onClick={onClose}
            src={cancelImg}
          />
        </div>

        <input
          className="p-2 border"
          type="text"
          id="title"
          defaultValue={task && task.title}
          name="title"
          placeholder="title"
        />
        <textarea
          className="p-2 h-28 border"
          defaultValue={task && task.description}
          id="description"
          name="description"
          placeholder="description"
        />
        <div className="flex flex-col">
          <label
            htmlFor="deadline"
            defaultValue={task && task.deadline}
            className="p-2 opacity-40"
          >
            deadline:
          </label>
          <input
            id="deadline"
            defaultValue={task && task.deadline}
            className="p-2 border"
            type="date"
            name="deadline"
          />
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex w-full justify-around"
        >
          {TaskImg.map((imgPath) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -10, scale: 0.8 },
                visible: { opacity: 1, x: 0, scale: [1.2, 1] },
              }}
              key={imgPath}
              onClick={() => handleSelectedImage(imgPath)}
              className={`w-10 h-10 overflow-hidden hover:scale-105 duration-75 ease-linear border-2 rounded-full ${
                imgPath === selectedImage && "border-primary"
              }`}
            >
              <img
                className="rounded-full w-10 h-10 hover:scale-125 cursor-pointer  duration-75 ease-linear shadow object-cover  shadow-stone-500"
                src={imgPath}
              />
            </motion.div>
          ))}
        </motion.div>
        <button className="rounded py-2 m-auto w-32 px-4 active:scale-95 duration-75 ease-linear bg-secondary hover:bg-primary shadow dark:bg-primary dark:hover:bg-dark-secondary ">
          {task
            ? isLoading
              ? "Updating..."
              : "Update"
            : isLoading
            ? "Saving..."
            : "Save"}
        </button>
      </form>
    </>
  );
}
