import { motion, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useScroll } from "framer-motion";

export default function Content() {
  const { scrollYProgress } = useScroll();
  const hidingDivScaleY = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <div
      id="content"
      className="p-10 relative max-[490px]:p-5 flex flex-col items-center gap-10 max-[490px]:w-[95%] w-[80%] m-auto "
    >
      <motion.div
        style={{ scaleY: hidingDivScaleY, transformOrigin: "bottom" }}
        className="absolute bottom-0 bg-background2 dark:bg-dark-background w-full h-[72%] sm:h-[68%] 2xl:h-[65%]"
      ></motion.div>
      <Link className="flex justify-center" to="/profile">
        <motion.button className=" dark:bg-dark-background2 origin-bottom hover:bg-primary  bg-background2  border border-primary py-3 px-4 rounded mt-96 ease-linear duration-100 hover:scale-105 ">
          Try Now!
        </motion.button>
      </Link>

      <p className="my-20 lg:w-[70%]">
        <span className="text-xl text-primary">Taskify</span> is here to help
        you streamline your tasks and achieve maximum productivity. Our
        user-friendly platform allows you to effortlessly add tasks, categorize
        them for easy organization, and track your progress seamlessly. Simply
        add your tasks, mark them as completed as you conquer them, and watch
        your productivity soar. Whether you're managing personal goals, work
        projects, or everyday errands, Taskify empowers you to stay focused,
        motivated,
      </p>

      <Link className="flex justify-center" to="/top-users">
        <motion.button className=" dark:bg-dark-background2 hover:bg-primary  bg-background2  border border-primary py-3 px-4 rounded ease-linear duration-100 hover:scale-105 ">
          See Top Users
        </motion.button>
      </Link>

      <motion.p className="my-10 lg:w-[70%]">
        <span className="text-xl text-primary">Gamify </span>your productivity!
        With Taskify, every completed task earns you taskify points, adding a
        fun twist to getting things done. Compete with friends or climb the
        global leaderboard – the choice is yours
      </motion.p>
    </div>
  );
}
