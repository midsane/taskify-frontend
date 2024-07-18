import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { handleScroll } from "./Navbar";
export default function DesktopNav({ listTitle, selectedTab, setSelectedTab }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (listTitle === "Home") {
      setSelectedTab("Home");
      navigate("/");
    } else if (listTitle === "Contact Us") {
      setSelectedTab("Contact Us");
      handleScroll("contact");
    } else if (listTitle === "Top Users") {
      setSelectedTab("Top Users");
      navigate("/top-users");
    }
  };
  return (
    <div className="h-full relative">
      <li
        onClick={handleClick}
        className="h-full relative z-40  border border-transparent ease-linear duration-100 cursor-pointer flex justify-center items-center rounded px-2 w-28"
      >
        {listTitle}
      </li>
      {selectedTab === listTitle && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full dark:bg-dark-background bg-background  "
          layoutId="nav-indicator"
        ></motion.div>
      )}
    </div>
  );
}
