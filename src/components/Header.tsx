import { Link } from "react-router-dom";
const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "ჩვენს შესახებ",
    path: "/about",
  },
  {
    name: "შესვლა",
    path: "/login",
  },
];
export default function Header() {
  return (
    <header className="bg-blue-300  h-[100px] flex items-center ">
      <nav className="">
        <ul className="flex gap-[20px]">
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
    </header>
  );
}
