import { AnimatePresence, motion } from "framer-motion";
import IntroDiv from "./introdiv";
import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [showAnimaion, setShowAnimation] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 800);
  });
  return (
    <AnimatePresence>
      {showAnimaion && (
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
                type: "spring",
                stiffness: 150,
              },
            },
          }}
          transition={{ duration: 0.8, type: "spring" }}
          initial="hidden"
          animate="visible"
          className="fixed flex z-50 justify-end items-end gap-0 w-full h-full top-20 max-[400px]:top-14 left-0 "
        > 
          <IntroDiv />
          <IntroDiv />
          <IntroDiv />
          <IntroDiv />
          <IntroDiv />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
