import { AnimatePresence } from "framer-motion";
import ErrorBox from "../error/error";
import Model from "../UI/model";
import cancelImg from "../../assets/cancel.png";
import { updateUsername } from "../../http/http";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Username({ initial }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const onClose = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const fd = new FormData(form);
    const username = fd.get("username");
    if (username === "") {
      setIsError("username cannot be empty!");
      return;
    } else if (username.length >= 15) {
      setIsError("username must be less than 15 characters");
      return;
    } else {
      setIsError(false);
    }
    SetIsLoading(true);
    await updateUsername(username);
    setIsEditing(false);
    SetIsLoading(false);
    navigate("/profile");
  };

  return (
    <>
      <AnimatePresence>
        {isEditing && (
          <Model onClose={onClose}>
            {isError && (
              <ErrorBox onClose={() => setIsError(false)} message={isError} />
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col relative justify-center items-center gap-5 p-5 max-[360px]:px-4 max-[360px]:gap-3 max-[360px]:text-sm bg-background2 "
            >
              <div>
                <img
                  onClick={onClose}
                  className="absolute top-2 right-2 opacity-80 hover:opacity-100 cursor-pointer hover:scale-105 duration-75 ease-linear w-5 "
                  src={cancelImg}
                />
              </div>
              <label htmlFor="username">Enter a new username:</label>
              <input
                id="username"
                className="rounded-sm p-1"
                type="text"
                name="username"
                placeholder="username"
              />
              <button className="rounded py-2 w-1/3 px-4 active:scale-95 duration-75 ease-linear bg-secondary hover:bg-primary  shadow dark:bg-primary dark:hover:bg-dark-secondary ">
                {isLoading ? "Saving..." : "Save"}
              </button>
            </form>
          </Model>
        )}
      </AnimatePresence>
      <h2 className="max-[500px]:text-sm">{initial}</h2>
      <button
        onClick={handleEdit}
        className="rounded max-[500px]:px-2 max-[500px]:py-1 py-2 px-4 bg-secondary hover:bg-primary  shadow dark:bg-primary dark:hover:bg-dark-secondary active:scale-95 duration-75 ease-linear"
      >
        Edit
      </button>
    </>
  );
}
