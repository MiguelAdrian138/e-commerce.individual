import { useState, useEffect } from "react";

const Footer: React.FC = () => {
  const [isScrolledDown, setIsScrolledDown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-gray-800 text-gray-300 transition-transform duration-300 ${
        isScrolledDown ? "translate-y-full" : ""
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm mt-2">
              &copy; 2025 Tienda AdrianTech Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6 mb-2">
            <ul className="flex justify-center mt-5 space-x-5">
              <li>
                <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10">
                    {/* ... */}
                  </svg>
                </a>
              </li>
              {/* ... */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
