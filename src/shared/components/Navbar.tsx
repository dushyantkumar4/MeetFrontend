import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

import { useState } from "react";
import logo from "@/assets/meetLogo4.png";

import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const navLinks = [{ name: "About", href: "/about" }];

  return (
    <nav
      className={` sticky top-0 z-50 bg-white/10 backdrop-blur-md  rounded-lg shadow-sm`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-15 object-cover" alt="logo" />
            <p className={` font-bold text-lg md:text-xl`}>Decent Meet</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="flex gap-4">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-purple-500 hover:text-purple-600 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex">
            <Show when="signed-out">
              <SignInButton /> &nbsp;
              <SignUpButton />
            </Show>{" "}
            &nbsp;
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-purple-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 bg-gray-800  backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mt-1  text-purple-500 hover:text-purple-600 transition"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center justify-between text-purple-500 hover:text-purple-600 transition">
            <span className="">Theme</span>
            <button>
              <Sun size={20} /> <Moon size={20} />
            </button>
          </div>

          <div>
            <Show when="signed-out">
              <SignInButton /> &nbsp;
              <SignUpButton />
            </Show>{" "}
            &nbsp;
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
