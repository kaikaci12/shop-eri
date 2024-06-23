import { Link } from "react-router-dom";
import LoginIcon from "/assets/login-icon.png";
import Menu from "/assets/menu.png";
import { useEffect, useState } from "react";
import SearchIcon from "/assets/search.png";
import OrderIcon from "/assets/order-icon.png";
import { IOrders } from "../types";
import { FiShoppingCart } from "react-icons/fi";
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

type TProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleLoginWindow: Function;
  orders: IOrders[];
};

export default function Header({
  setSearchValue,
  orders,
  handleLoginWindow,
}: TProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuActive, setMenuActive] = useState(false);
  const [headerChange, setHeaderChange] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleHeaderChange = () => {
      if (window.scrollY > 150) {
        setHeaderChange(true);
      } else {
        setHeaderChange(false);
      }
    };
    window.addEventListener("scroll", handleHeaderChange);
    return () => {
      window.removeEventListener("scroll", handleHeaderChange);
    };
  });
  return (
    <header
      className={`bg-gray-400  z-[999] ${
        headerChange
          ? "md:h-[100px] flex items-center  ease-in-out transition-all duration-500"
          : "md:h-[150px] relative"
      }   h-[100px] w-full fixed flex flex-col gap-[32px]  items-center p-6 `}
    >
      <div className={` flex flex-col   w-full ${headerChange && "flex-row "}`}>
        {windowWidth < 640 ? (
          <div
            onClick={() => setMenuActive(!menuActive)}
            className={`flex gap-[16px] items-center`}
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
          <div
            className={`flex  gap-5 ${headerChange ? "flex-row" : "flex-col"}`}
          >
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
            <div className={`w-full `}>
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
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="search"
                  className={`rounded-[6px] h-[60px] px-[16px] w-[50%] ${
                    headerChange && "lg:w-[400px]"
                  }`}
                  placeholder="პროდუქტების ძებნა"
                  id="search"
                />
              </label>
            </div>
          </div>
        )}
        <div
          className={`absolute flex h-[100px] sm:h-[150px] right-[20px]    ${
            headerChange
              ? "flex-row gap-6 md:h-[100px] top-0"
              : "flex-col gap-6 "
          }  items-center`}
        >
          <Link to="/cart">
            <div className="text-[1rem]  cursor-pointer  flex items-center justify-center text-white font-bold  ">
              <span>კალათა</span>

              <FiShoppingCart size={30} />
              {orders.length > 0 && (
                <div className="w-[16px] h-[20px] relative  right-[20px] bottom-[10px] rounded-lg bg-red-500 flex justify-center items-center text-white font-bold text-[1rem]">
                  {orders.length}
                </div>
              )}
            </div>
          </Link>

          <div
            onClick={(e) => {
              e.preventDefault();
              handleLoginWindow();
            }}
            className="flex    cursor-pointer text-white font-bold  items-center "
          >
            შესვლა
            <img src={LoginIcon} alt="" className="w-[30px] " />
          </div>
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
    </header>
  );
}
