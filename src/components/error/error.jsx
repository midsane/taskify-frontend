import { motion } from "framer-motion";
import cancelImg from "../../assets/cancel.png";
export default function ErrorBox({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col fixed top-0 right-0 rounded bg-red-200 p-8 text-stone-800 border-b border-b-red-500 "
    >
      <h2>An Error Occurred!</h2>
      <p className="font-light">{message}</p>
      <img
        onClick={onClose}
        className="w-6 cursor-pointer fixed top-1 right-1"
        src={cancelImg}
      />
    </motion.div>
  );
}
