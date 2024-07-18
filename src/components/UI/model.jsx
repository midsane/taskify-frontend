import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
export default function Model({ onClose, children }) {
  const dialog = useRef();
  useEffect(() => {
    dialog.current.showModal();
  });
  return (
    <>
      <motion.dialog
        layout
        ref={dialog}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rounded-lg fixed z-50 bg-background"
        onClose={onClose}
      >
        {children}
      </motion.dialog>
    </>
  );
}
