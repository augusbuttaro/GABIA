import { useEffect, useState } from "react";
import fullLogo from "../public/full_logo.png";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { HiMoon, HiOutlineSun  } from "react-icons/hi2";
import { pageUtils } from "../utils/pages";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true);
      setTimeout(() => setAnimateOpen(true), 10);
    } else {
      setAnimateOpen(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  return (
    <nav className="bg-[#e6f1f0] dark:bg-blue-100 shadow-md py-4 relative z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-[80%] mx-auto flex justify-between items-center">
        <Link to="/">
          <img className="h-14" src={fullLogo} alt="Logo" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="transition"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <HiMoon className="w-5 h-5" /> : <HiOutlineSun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${menuOpen ? "text-blue-100 dark:text-emerald-600 hover:text-white" : "text-gray-800 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400"} text-3xl p-2 transition duration-300 z-50 relative`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {isVisible && (
        <div
          className={`fixed top-0 right-0 w-1/4 min-w-[240px] bg-asparagus-700 dark:bg-brunswick z-30 shadow-lg border-l border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out px-6 pt-32 pb-16 rounded-bl-xl
            ${animateOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}
          `}
        >
          <div className="flex flex-col gap-8 text-gray-800 dark:text-gray-200 text-sm font-semibold tracking-wide">
            {
                pageUtils.map((page) => {
                    return(
                        <Link className="hover:text-emerald-500 dark:hover:text-emerald-400 text-lg" to={page.link} onClick={() => setMenuOpen(false)}>{page.name.toUpperCase()}</Link>
                    )
                })
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
