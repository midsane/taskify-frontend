import { motion } from "framer-motion";
export default function TaskTab({ type, selectedTab, setSelectedTab }) {
  const handleClick = () => {
    setSelectedTab(type);
  };
  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="py-5 max-[400px]:py-3  max-[400px]:text-sm flex justify-center relative z-40 items-center duration-75 ease-linear cursor-pointer dark:border-dark-background rounded"
      >
        {type}
      </div>
      {selectedTab === type && (
        <motion.div
          layoutId="tab-indicator"
          transition={{
            duration: 0.15,
            type: "spring",
            stiffness: 170,
            damping: 20,
          }}
          className="w-full top-0 left-0 h-full absolute bg-background dark:bg-dark-background"
        ></motion.div>
      )}
    </div>
  );
}
