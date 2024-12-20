import { motion } from "framer-motion";
export default function Hamburger({ handleHamburger, hamburgerOpen }) {
  return (
    <div
      onClick={handleHamburger}
      className="flex flex-col gap-[10px] cursor-pointer items-center justify-center"
    >
      <motion.div
        animate={{ rotate: hamburgerOpen ? 45 : 0 , y: hamburgerOpen? 13:10}}
        className="w-9 h-1 bg-primary dark:bg-dark-primary "
      ></motion.div>
      <motion.div
        animate={{ opacity: hamburgerOpen ? 0 : 1, y: hamburgerOpen ? -10 : 5 }}
        className="w-9 h-1 bg-primary dark:bg-dark-primary "
      ></motion.div>
      <motion.div
        animate={{
          rotate: hamburgerOpen ? -45 : 0,
          y: hamburgerOpen ? -13 : 0,
        }}
        className="w-9 h-1 bg-primary dark:bg-dark-primary "
      ></motion.div>
    </div>
  );
}
