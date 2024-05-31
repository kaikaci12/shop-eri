import { Link } from "react-router-dom";
import LoginIcon from "/assets/login-icon.png";
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
  regWindow: boolean;
  handleRegWindow: Function;
};
export default function Header({ regWindow, handleRegWindow }: TRegWindow) {
  return (
    <header className="bg-blue-300  h-[100px] flex items-center ">
      <nav className="">
        <ul className="flex gap-[20px] h-full items-center">
          {navLinks.map((link, index) => {
            return (
              <Link key={index} to={link.path}>
                <li className="text-white font-bold text-[1rem] no-underline">
                  {link.name}
                </li>
              </Link>
            );
          })}
          <div
            onClick={() => handleRegWindow()}
            className="flex  cursor-pointer text-white font-bold h-full items-center "
          >
            შესვლა
            <img src={LoginIcon} alt="" className="w-[40px] " />
          </div>
        </ul>
      </nav>
    </header>
  );
}
