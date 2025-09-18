import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you would decode the JWT or fetch user data
      setUser({ name: "User", avatar: null });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure? to logout",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
        Swal.fire({
          title: "Logout successfull!",
          text: "you have been logout .",
          icon: "success",
        });
      }
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-md shadow-md py-3"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            className="flex items-center font-bold text-xl text-white relative"
            to="/"
            onClick={closeAllMenus}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">N</span>
              </div>
              <span
                className={`${
                  isScrolled
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                }`}
              >
                NoteFlow
              </span>
              <span className="absolute -top-2 -right-8 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Pro
              </span>
            </div>
          </Link>

          {/* Search bar for larger screens */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <i
                  className={`fas fa-search ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                ></i>
              </span>
              <input
                type="text"
                placeholder="Search notes..."
                className={`w-full pl-10 pr-4 py-2 rounded-full border-0  text-white  focus:bg-white/25 focus:ring-2 focus:ring-white/30 focus:outline-none transition-all ${
                  isScrolled
                    ? "  placeholder-black bg-slate-400 "
                    : "bg-white/15"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              className=" md:block bg-white/10 rounded-full w-9 h-9 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-30"
              aria-label="Toggle theme"
            >
              <i className="fas fa-sun"></i>
            </button>

            <button
              className={`lg:hidden rounded-md p-2 bg-white/10 ${
                isMobileMenuOpen ? "bg-white/20" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              <div className="w-5 h-0.5 bg-white mb-1.5"></div>
              <div className="w-5 h-0.5 bg-white mb-1.5"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </button>
          </div>

          <div
            className={`lg:flex lg:items-center ${
              isMobileMenuOpen
                ? "absolute top-full left-0 right-0 bg-white/98 lg:bg-transparent rounded-b-xl lg:rounded-none shadow-xl lg:shadow-none p-4 lg:p-0"
                : "hidden"
            } lg:static`}
          >
            {/* Search bar for mobile */}
            <div className="lg:hidden mb-4">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-0 bg-gray-100 text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                />
              </div>
            </div>

            <ul className="flex flex-col lg:flex-row lg:items-center gap-2">
              {/* <li>
                <Link 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActiveLink("/home") ? 'bg-white/20 text-white lg:bg-purple-100 lg:text-purple-600' : 'text-white lg:text-gray-700 hover:bg-white/10 lg:hover:bg-gray-100'}`}
                  to="/home"
                  onClick={closeAllMenus}
                >
                  <i className="fas fa-home"></i>
                  Home
                </Link>
              </li> */}
              <li>
                <Link
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActiveLink("/about")
                      ? "bg-white/20 text-white lg:bg-purple-100 lg:text-purple-600"
                      : "text-red-400 lg:text-gray-700 hover:bg-white/10 lg:hover:bg-gray-100"
                  }`}
                  to="/about"
                  onClick={closeAllMenus}
                >
                  <i className="fas fa-info-circle"></i>
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActiveLink("/addnotes")
                      ? "bg-white/20 text-white lg:bg-purple-100 lg:text-purple-600"
                      : "text-green-600 lg:text-gray-700 hover:bg-white/10 lg:hover:bg-gray-100"
                  }`}
                  to="/add-notes"
                  onClick={closeAllMenus}
                >
                  <i className="fas fa-plus"></i>
                  Add Notes
                </Link>
              </li>

              {!localStorage.getItem("token") ? (
                <>
                  <li className="mt-2 lg:mt-0 lg:ml-2">
                    <Link
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/15 lg:bg-gradient-to-r lg:from-purple-600 lg:to-indigo-600 text-white justify-center transition-all hover:bg-white/25 lg:hover:shadow-md`}
                      to="/signup"
                      onClick={closeAllMenus}
                    >
                      <i className="fas fa-user-plus"></i>
                      Sign Up
                    </Link>
                  </li>
                  <li className="mt-2 lg:mt-0 lg:ml-2">
                    <Link
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-gradient-to-r from-white/20 to-white/10 lg:from-white/20 lg:to-white/10 text-white justify-center transition-all hover:from-white/25 hover:to-white/15 lg:hover:shadow-md`}
                      to="/login"
                      onClick={closeAllMenus}
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="lg:hidden">
                    <Link
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                      to="/profile"
                      onClick={closeAllMenus}
                    >
                      <i className="fas fa-user-circle text-purple-600"></i>
                      Profile
                    </Link>
                  </li>
                  <li className="lg:hidden">
                    <Link
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                      to="/settings"
                      onClick={closeAllMenus}
                    >
                      <i className="fas fa-cog text-purple-600"></i>
                      Settings
                    </Link>
                  </li>
                  <li className="mt-2 lg:hidden">
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-red-100 text-red-600 justify-center transition-all hover:bg-red-200"
                      onClick={() => {
                        handleLogOut();
                        closeAllMenus();
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </li>

                  {/* User dropdown for desktop */}
                  <li className="hidden lg:block relative ml-2">
                    <div className="relative">
                      <button
                        className={`flex items-center gap-2  border border-white/20 rounded-full px-3 py-1.5 text-white transition-all  ${
                          isScrolled
                            ? "bg-black hover:bg-black/50"
                            : "bg-white/10 hover:bg-white/20"
                        } cursor-pointer`}
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                      >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <i className="fas fa-user"></i>
                        </div>
                        <span className="font-medium text-sm">
                          {user?.name}
                        </span>
                        <i
                          className={`fas fa-chevron-down text-xs transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        ></i>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn z-20">
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                            onClick={closeAllMenus}
                          >
                            <i className="fas fa-user-circle text-purple-600 w-5"></i>
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                            onClick={closeAllMenus}
                          >
                            <i className="fas fa-cog text-purple-600 w-5"></i>
                            Settings
                          </Link>
                          <div className="border-t border-gray-200 my-1"></div>
                          <button
                            className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                            onClick={() => {
                              handleLogOut();
                              closeAllMenus();
                            }}
                          >
                            <i className="fas fa-sign-out-alt w-5"></i>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>

      <Outlet />
    </>
  );
}

export default NavBar;
