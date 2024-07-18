import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function HamburgerNav({
  item,
  handleScroll,
  setHamburgerOpen,
  setSelectedTab,
}) {
  const navigate = useNavigate();

  const handleNavClick = (item) => {
    if (item === "Contact Us") {
      setHamburgerOpen(false);
      handleScroll("contact");
    } else {
      let route;
      if (item == "Home") {
        route = "/";
        setSelectedTab("Home");
      } else if (item === "Contact Us") {
        setSelectedTab("Contact Us");
      } else if (item === "Top Users") {
        setSelectedTab("Top Users");
        route = "/top-users";
      } else if (item === "Profile") {
        setSelectedTab("Profile");
        route = "/profile";
      } else if (item === "Logout") {
        route = "/logout";
      } else if (item === "Login") {
        route = "/auth?mode=login";
      }
      setHamburgerOpen(false);
      navigate(route);
    }
  };

  return (
    <motion.li
      onClick={() => handleNavClick(item)}
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
      }}
      className="hover:bg-background2 rounded dark:hover:bg-dark-background py-3 px-2 ease-out duration-75  border-b cursor-pointer border-border dark:border-dark-border"
    >
      {item}
    </motion.li>
  );
}
