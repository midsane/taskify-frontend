import { useRef, useState } from "react";
import ImagePfp from "./image";
import editImg from "../../assets/tool.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addImageToDb } from "../../http/http";

export default function ImagePicker({ userData }) {
  const navigate = useNavigate();
  const inputImageRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        await addImageToDb(reader.result);
        navigate("/profile");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputImageRef.current.click();
  };
  const pfpcontent = ImagePfp(userData);
  return (
    <>
      <div
        onClick={handleClick}
        className="border-background  border dark:border-dark-background2 flex overflow-hidden relative cursor-pointer justify-center items-center w-20 max-[500px]:w-16 aspect-square rounded-full bg-cyan-100 text-black"
      >
        <motion.div
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.5 }}
          className="absolute flex justify-center items-center z-10 w-full h-full rounded-full"
        >
          {pfpcontent}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 2 }}
          className="absolute z-20 w-full h-full rounded-full flex justify-center items-center"
        >
          <motion.img
            className="w-4 max-[500px]:w-3 absolute bg-white rounded z-20"
            src={editImg}
          />
          <input
            ref={inputImageRef}
            className="absolute flex scale-0"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </motion.div>
      </div>
    </>
  );
}
