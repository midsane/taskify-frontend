import { useContext, useEffect, useState } from "react";
import darkImg from "../assets/dark.png";
import lightImg from "../assets/light.png";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Context } from "../store/store";

import HamburgerNav from "./HamburgerNavElements";
import Hamburger from "./Hamburger";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImagePfp from "./profile/image";
import DesktopNav from "./desktopnavbar";

const getCurrentTab = (url) => {
  if (url.startsWith("/profile")) return "Profile";
  else if (url.startsWith("/top-users")) return "Top Users";
  else if (url.startsWith("/")) return "Home";
};

export const handleScroll = (id) => {
  const container = document.getElementById(id);
  container.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar({ userData }) {
  const [navbar, setNavbar] = useState(
    window.innerWidth >= 640 ? "desktop" : "mobile"
  );
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [pfpMenu, setPfpMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = getCurrentTab(location.pathname);
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { theme, setTheme } = useContext(Context);

  const handleClick = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && navbar === "desktop") {
        setNavbar("mobile");
      }
      if (window.innerWidth >= 640 && navbar === "mobile") {
        setNavbar("desktop");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navbar]);

  const handleHamburger = () => {
    setHamburgerOpen((state) => !state);
  };

  const handlePfpClick = () => {
    setPfpMenu((state) => !state);
  };

  const handleClickPfpItems = (route) => {
    setPfpMenu((state) => !state);
    setSelectedTab("Profile");
    navigate("/" + route);
  };

  let NavTags;
  let DynamicNavContent;

  if (userData) {
    const pfpcontent = ImagePfp(userData);
    DynamicNavContent = (
      <div className="border rounded-full">
        <li onClick={handlePfpClick} className="rounded-full overflow-hidden">
          <div className=" ease-linear aspect-square h-14  cursor-pointer flex justify-center items-center rounded-full dark:bg-dark-background ">
            {pfpcontent}
          </div>
        </li>
        <AnimatePresence>
          {pfpMenu && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative"
            >
              <ul className="fixed bg-background2 dark:bg-dark-background2 border border-border dark:border-dark-border flex flex-col p-10 rounded-lg shadow">
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-border dark:border-dark-border duration-100 ease-linear cursor-pointer hover:bg-background dark:hover:bg-dark-background py-2 px-5 rounded-t"
                  onClick={() => handleClickPfpItems("profile")}
                >
                  Profile
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-border dark:border-dark-border duration-100 ease-linear cursor-pointer hover:bg-background dark:hover:bg-dark-background py-2 px-5 rounded-t "
                  onClick={() => handleClickPfpItems("logout")}
                >
                  Logout
                </motion.li>
              </ul>
              <div className="bg-background2 dark:bg-dark-background2 top-0 left-2 border-t border-border dark:border-dark-border border-l absolute w-5 aspect-square rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    NavTags = ["Home", "Contact Us", "Top Users", "Profile", "Logout"];
  } else {
    NavTags = ["Home", "Contact Us", "Top Users", "Login"];
    DynamicNavContent = (
      <Link to="/auth?mode=login">
        <li>
          <div className="px-5 h-14 dark:hover:text-text hover:bg-primary dark:hover:bg-dark-primary duration-150 ease-linear py-3 cursor-pointer flex justify-center items-center rounded opacity-85 hover:opacity-100 h-max-full bg-background dark:bg-dark-background ">
            Login
          </div>
        </li>
      </Link>
    );
  }

  const desktop = (
    <nav className="border-b border-border dark:border-dark-border z-20 fixed w-screen h-20 bg-background2 dark:bg-dark-background2 top-0 left-0 flex justify-between px-10 py-3 ">
      <ul className="flex justify-around w-1/3 max-[1280px]:w-1/2 max-[900px]:w-[70%] items-center">
        <li className="h-full border border-transparent ease-linear duration-100 cursor-pointer flex justify-center items-center rounded px-2 w-28">
          <Link to="/">
            <img
              onClick={() => setSelectedTab("Home")}
              className="h-14 w-auto"
              src="logo.png"
            />
          </Link>
        </li>
        <DesktopNav
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          listTitle="Home"
        />
        <DesktopNav
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          listTitle="Contact Us"
        />
        <DesktopNav
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          listTitle="Top Users"
        />
      </ul>
      <ul className="flex w-1/6 max-[900px]:w-[25%] w-min-fit justify-center gap-5 items-center">
        {DynamicNavContent}
        <li>
          <button
            className="rounded-3xl h-14 p-2 hover:bg-background dark:hover:bg-dark-background"
            onClick={handleClick}
          >
            <motion.img
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, rotate: [-10, 10, 0] }}
              transition={{ type: "spring", stiffness: 200, duration: 1 }}
              key={theme}
              className="h-10 aspect-square"
              src={theme === "light" ? lightImg : darkImg}
            />
          </button>
        </li>
      </ul>
    </nav>
  );

  const mobile = (
    <>
      <nav className="border-b border-border max-[400px]:h-14 dark:border-dark-border bg-background2 dark:bg-dark-background2 fixed w-screen h-20 top-0 z-30 left-0 flex justify-between px-10 py-3 ">
        <Hamburger
          handleHamburger={handleHamburger}
          hamburgerOpen={hamburgerOpen}
        />
        <ul className=" flex justify-center gap-5 items-center">
          <li>
            <div className="h-14 aspect-square flex justify-center items-center h-max-full cursor-pointer ">
              <Link to="/">
                <img
                  onClick={() => setSelectedTab("Home")}
                  className="h-10 w-auto"
                  src="logo.png"
                />
              </Link>{" "}
            </div>
          </li>
          <li>
            <button
              className="rounded-3xl h-12 p-2 hover:bg-background dark:hover:bg-dark-background"
              onClick={handleClick}
            >
              <motion.img
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, rotate: [-10, 10, 0] }}
                transition={{ type: "spring", stiffness: 200, duration: 1 }}
                key={theme}
                className="h-full aspect-square"
                src={theme === "light" ? lightImg : darkImg}
              />
            </button>
          </li>
        </ul>
      </nav>
      <AnimatePresence>
        {hamburgerOpen && (
          <motion.ul
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.07 },
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-background2 border-t border-b border-primary dark:border-dark-primary w-screen z-40 dark:bg-dark-background2 dark:text-dark-text flex flex-col text-text fixed top-20 px-10 py-10 "
          >
            {NavTags.map((item) => (
              <HamburgerNav
                setHamburgerOpen={setHamburgerOpen}
                key={item}
                setSelectedTab={setSelectedTab}
                item={item}
                handleScroll={handleScroll}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {navbar === "desktop" ? desktop : mobile}

      <motion.div
        className="h-2 w-screen z-30 origin-left max-[400px]:top-14 max-[400px]:h-1 left-0 fixed top-20 bg-gradient-to-r from-yellow-300 to-yellow-400 dark:bg-gradient-to-r dark:from-cyan-300 dark:to-cyan-400"
        style={{ scaleX }}
      ></motion.div>
    </>
  );
}
