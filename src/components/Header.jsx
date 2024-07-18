import headerImg from "../../public/14.png";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Header() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 450]);
  const scaleText = useTransform(scrollY, [0, 400], [1, 1.8]);
  const opacityImg = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div
      id="home"
      className="py-20  dark:bg-dark-background text-text dark:text-dark-text flex flex-col justify-center items-center h-screen"
    >
      <motion.img
        style={{ opacity: opacityImg }}
        className="w-[80vw] md:w-[40vw] sm:w-[60vw] m-auto"
        src={headerImg}
      />
      <div className="relative">
        <motion.h1
          style={{ y: yText, scale: scaleText }}
          className=" text-5xl py-2 lg:text-6xl bg-gradient-to-r from-yellow-400 to-primary dark:from-cyan-300 dark:to-dark-primary  text-transparent bg-clip-text "
        >
          Taskify
        </motion.h1>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 2, type: "spring" }}
          className="absolute h-full bg-background2 dark:bg-dark-background  top-0 right-0"
        ></motion.div>
      </div>
    </div>
  );
}
