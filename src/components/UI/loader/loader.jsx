import styles from "./loader.module.css";
import { motion } from "framer-motion";
export default function LoaderUi() {
  return (
    <motion.div
      animate={{ rotate: [null, 360] }}
      transition={{ type: "tween", repeat: Infinity, duration: 0.8 }}
      className={styles.main}
    ></motion.div>
  );
}
