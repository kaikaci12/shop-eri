import { Link } from "react-router-dom";
import LoginIcon from "/assets/login-icon.png";
import Menu from "/assets/menu.png";
import { useEffect, useState } from "react";
import SearchIcon from "/assets/search.png";
const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "ჩვენს შესახებ",
    path: "/about",
  },
];

type TRegWindow = {
  handleRegWindow: Function;
};

export default function Header({ handleRegWindow }: TRegWindow) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-gray-400 h-[100px] flex items-center px-[30px]">
      {windowWidth < 400 && <img src={Menu} className="w-[30px] " />}
      <div className="bg-[#017EFA] h-[100px] w-[1px] absolute right-[140px] "></div>

      <nav className="flex w-full items-center justify-between">
        <ul className="flex gap-[20px] h-full items-center ">
          {navLinks.map((link, index) => {
            return (
              <Link key={index} to={link.path}>
                <li className="text-white font-bold text-[1rem] no-underline">
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>

        <label htmlFor="search" className="flex  gap-[10px] ">
          <div className="flex gap-[4px] items-center text-white font-bold text-[1rem]">
            ძიება
            <img
              src={SearchIcon}
              alt="search-icon"
              className="w-[16px] h-[16px]"
            />
          </div>
          <input
            type="search"
            className="rounded-[6px] h-[60px] px-[16px] lg:min-w-[600px]"
            placeholder="პროდუქტების ძებნა"
            id="search"
          />
        </label>

        <div className="    ">
          <div
            onClick={() => handleRegWindow()}
            className="flex   justify-end cursor-pointer text-white font-bold h-full items-center "
          >
            შესვლა
            <img src={LoginIcon} alt="" className="w-[30px] mt-[5px]" />
          </div>
        </div>
      </nav>
    </header>
  );
}
