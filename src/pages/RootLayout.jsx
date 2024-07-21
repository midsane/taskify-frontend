import { Outlet, useLoaderData, redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scrollTotop";
import ContextProvider from "../store/store";
import { scrollTop } from "../components/scrollTotop";
import { baseURl } from "../http/http";
import IntroAnimation from "../intro-animation/introAnimation";
import { motion, useScroll, useSpring} from "framer-motion";

export default function RootLayout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  scrollTop();
  const data = useLoaderData();
  let userData = null;
  if (data) {
    userData = data.userData;
  }

  return (
    <ContextProvider>
      <motion.div
        className="h-2 w-screen z-30 origin-left max-[400px]:top-14 max-[400px]:h-1 left-0 fixed top-20 bg-gradient-to-r from-yellow-300 to-yellow-400 dark:bg-gradient-to-r dark:from-cyan-300 dark:to-cyan-400"
        style={{ scaleX }}
      ></motion.div>
      <IntroAnimation />
      <Navbar userData={userData} />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </ContextProvider>
  );
}

export const loader = async ({ request }) => {
  const token = localStorage.getItem("token");
  if (request.url === baseURl + "top-users") {
    return null;
  } else if (request.url === baseURl + "profile" && !token) {
    return redirect("/auth?mode=login");
  } else if (!token) {
    return null;
  }

  const response = await fetch(baseURl + "profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (response.status === 403) {
    throw json({ message: "invalid token" }, { status: 403 });
  }

  if (!response.ok) {
    throw json({ message: "internal server error" }, { status: 500 });
  }
  try {
    const resData = await response.json();

    return resData;
  } catch (error) {
    throw json(
      { menubar: error.message || "an error occurred" },
      { status: 500 }
    );
  }
};
