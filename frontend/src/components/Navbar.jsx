import React, { useState, useEffect } from 'react';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem("User");
    if (storedName) setUserName(storedName);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent bg-opacity-70 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        <Link to="/">FoundIt</Link>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-lg items-center">
        <li className="hover:text-blue-500 transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-500 transition">
          <Link to="/lost">Lost</Link>
        </li>
        <li className="hover:text-blue-500 transition">
          <Link to="/found">Found</Link>
        </li>
        {/* <li className="hover:text-blue-500 transition">
          <Link to="/contact">Contact</Link>
        </li> */}
        <li className="hover:text-purple-300 transition">
          {userName ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/SignIn">Signin</Link>
          )}
        </li>
      </ul>

      {/* Mobile Icon */}
      <div onClick={handleNav} className="md:hidden cursor-pointer">
        {nav ? <IoMdClose size={28} /> : <LuMenu size={28} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-gray-900 bg-opacity-95 backdrop-blur-lg p-6 transition-transform duration-300 ease-in-out ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-6 mt-14 text-lg">
          <li className="hover:text-blue-400 transition">
            <Link to="/" onClick={handleNav}>Home</Link>
          </li>
          <li className="hover:text-blue-400 transition">
            <Link to="/lost" onClick={handleNav}>Lost</Link>
          </li>
          <li className="hover:text-blue-400 transition">
            <Link to="/found" onClick={handleNav}>Found</Link>
          </li>
          <li className="hover:text-blue-400 transition">
            <Link to="/contact" onClick={handleNav}>Contact</Link>
          </li>
          <li className="hover:text-purple-300 transition">
            {userName ? (
              <Link to="/profile" onClick={handleNav}>Profile</Link>
            ) : (
              <Link to="/SignIn" onClick={handleNav}>Signin</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
