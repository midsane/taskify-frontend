import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticFramer({ children, link }) {
  const svgRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const onMouseEnter = (e) => {
    const { clientX, clientY } = e;
    const { left, top, height, width } = svgRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={svgRef}
      animate={{ x: position.x / 2, y: position.y / 2 }}
      transition={{ type: "spring", stiffness: 150, mass: 0.5 }}
      className="cursor-pointer"
    >
      <a target="_blank" href={link}>
        {children}
      </a>
    </motion.div>
  );
}
