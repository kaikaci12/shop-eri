import { Link } from "react-router-dom";
import LoginIcon from "/assets/login-icon.png";
import Menu from "/assets/menu.png";
import { useEffect, useState } from "react";
import SearchIcon from "/assets/search.png";
import OrderIcon from "/assets/order-icon.png";
const navLinks = [
  {
    name: "მაღაზია",
    path: "/",
  },
  {
    name: "ჩვენს შესახებ",
    path: "/about",
  },
  {
    name: "წესები და პირობები",
    path: "/rules",
  },
];

type TRegWindow = {
  handleRegWindow: Function;
};

export default function Header({ handleRegWindow }: TRegWindow) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuActive, setMenuActive] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-gray-400 sm:h-[150px] h-[100px] flex flex-col gap-[32px]  items-center px-[16px] pb-[16px]">
      <div className="h-full flex items-center w-full ">
        {windowWidth < 640 ? (
          <div
            onClick={() => setMenuActive(!menuActive)}
            className="flex gap-[16px] items-center"
          >
            <img src={Menu} className="w-[30px] " />
            <label htmlFor="search" className="flex  gap-[10px] ">
              <div className="flex gap-[4px] items-center text-white font-bold text-[1rem]">
                ძიება
                <img
                  src={SearchIcon}
                  alt="search-icon"
                  className="w-[16px] h-[16px]"
                />
              </div>
            </label>
          </div>
        ) : (
          <nav className="flex   lg:gap-[40px]">
            <ul className="flex gap-[20px]  items-center ">
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
          </nav>
        )}
      </div>

      <div className="absolute h-[100px] sm:h-[150px] right-[20px] flex-col  flex gap-[1px]  items-center">
        <div className="text-[1rem]   items-center justify-center text-white font-bold flex gap-[10px]">
          <span>ჩემი შეკვეთები</span>
          <img src={OrderIcon} alt="" className=" w-[40px] mt-[10px]" />
        </div>
        <div
          onClick={() => handleRegWindow()}
          className="flex    cursor-pointer text-white font-bold h-full items-center "
        >
          შესვლა
          <img src={LoginIcon} alt="" className="w-[30px] mt-[5px]" />
        </div>
      </div>

      {menuActive && (
        <div className="fixed transition-all ease-out duration-500 translate-x-0  top-[120px] left-0 w-[400px] p-[25px] h-[200px] bg-slate-400">
          <input
            type="search"
            className="rounded-[6px] h-[60px] px-[16px] w-full "
            placeholder="პროდუქტების ძებნა"
            id="search"
          />
          <nav className="flex w-full items-center  gap-[20px] lg:gap-[40px]">
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
          </nav>
        </div>
      )}
      {windowWidth >= 640 && (
        <div className="w-full">
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
              className="rounded-[6px] h-[60px] px-[16px] w-[50%]"
              placeholder="პროდუქტების ძებნა"
              id="search"
            />
          </label>
        </div>
      )}
    </header>
  );
}
