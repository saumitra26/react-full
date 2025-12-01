import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bookImage from "../../assets/image/bookImage.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600 font-semibold transition-colors py-1"
      : "text-gray-700  hover:bg-green-400 py-1 px-2 rounded-md  transition-colors";
  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white w-full  shadow">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <NavLink to="/" className={` flex items-center`}>
              <img className="h-14 w-auto " src={bookImage} alt="LibraryBook" />
              <span className="hidden md:block text-black text-2xl font-bold ml-2 ">
                Book Library
              </span>
            </NavLink>
          </div>
          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-6">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/book">
              Book
            </NavLink>
            <NavLink className={linkClass} to="/writer">
              Writer
            </NavLink>
            <NavLink className={linkClass} to="/addBook">
              Add Book
            </NavLink>
            <NavLink className={linkClass} to="/addWriter">
              Add Writer
            </NavLink>
            {user ? (
              <button
                className="text-gray-700 hover:text-red-500 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink className={linkClass} to="/login">
                  Login
                </NavLink>
                <NavLink className={linkClass} to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
          {/* hambarger menus */}
          <div
            className="sm:hidden cursor-pointer z-1000 p-4 flex flex-col"
            onClick={() => setOpen(!open)}
          >
            {open ? (  
              <div className=" flex items-center justify-center relative">
                <span className="absolute w-[30px] h-[3px] bg-[#333] rotate-45 transition-all duration-300"></span>
                <span className="absolute w-[30px] h-[3px] bg-[#333] -rotate-45 transition-all duration-300"></span>
              </div>
            ) : (
              <>
                <span className="w-[30px] h-[3px] my-1 bg-[#333]"></span>
                <span className="w-[30px] h-[3px] my-1 bg-[#333]"></span>
                <span className="w-[30px] h-[3px] my-1 bg-[#333]"></span>
              </>
            )}
          </div>

          {/* Mobile menu */}
          {open && (
            <>
              <div
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/0 sm:hidden z-40"
              ></div>
              <div
                className="fixed sm:hidden top-0 right-0 w-[250px] h-full z-100 bg-white shadow
            
             transition ease-in-out duration-300"
              >
                <ul className="p-4 space-y-4 ml-3">
                  <li>
                    <Link to="/" onClick={() => setOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/book" onClick={() => setOpen(false)}>
                      Book
                    </Link>
                  </li>
                 
                  <li>
                    <Link to="/writer" onClick={() => setOpen(false)}>
                      Writer
                    </Link>
                  </li>
                   <li>
                    <Link to="/addBook" onClick={() => setOpen(false)}>
                      Add Writer
                    </Link>
                  </li>
                  {user ? (
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={() => setOpen(false)}>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
