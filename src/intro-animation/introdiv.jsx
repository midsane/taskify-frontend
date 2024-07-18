import { motion } from "framer-motion";
export default function IntroDiv({ order }) {
  return (
    <motion.div
      className="w-[20%] bg-dark-background2 "
      variants={{
        hidden: { height: "100%" },
        visible: { height: "0%" },
      }}
    ></motion.div>
  );
}
