import { Show, SignInButton, UserButton } from "@clerk/react";

import { useState } from "react";
import logo from "@/assets/meetLogo6.png";

import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const navLinks = [{ name: "About", href: "/about" }];

  return (
    <nav
      className={` sticky top-0 z-50 bg-white/10 backdrop-blur-md  rounded-lg`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-14 object-cover" alt="logo" />
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
                className="gradient-text-primary font-bold"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex gradient-text-primary font-bold">
            <Show when="signed-out">
              <SignInButton />
            </Show>
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
          {isOpen ? <X/> : <Menu />}
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
              className="mt-1  gradient-text-primary"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center justify-between gradient-text-primary">
            <span className="">Theme</span>
            <button>
              <Sun size={20} /> 
              {/* <Moon size={20} /> */}
            </button>
          </div>

          <div className="gradient-text-primary font-bold">
            <Show when="signed-out">
              <SignInButton />
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
