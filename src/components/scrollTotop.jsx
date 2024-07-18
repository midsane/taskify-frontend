import { useContext, useEffect } from "react";
import { Context } from "../store/store";
import darkupImg from "../assets/up-dark.png";
import lightupImg from "../assets/up-light.png";

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function ScrollToTop() {
  const { theme } = useContext(Context);

  const changeImg = () => {
    if (theme === "dark") {
      srcImg = darkupImg;
    } else {
      srcImg = lightupImg;
    }
  };
  const handleClick = () => {
    scrollTop();
  };

  let srcImg;

  useEffect(() => {
    changeImg();
  }, [theme]);

  changeImg();

  return (
    <img
      src={srcImg}
      onClick={handleClick}
      className="w-10 h-10 fixed z-30 border border-text dark:border-dark-text cursor-pointer rounded-full -rotate-90 bottom-5 right-5"
    ></img>
  );
}
