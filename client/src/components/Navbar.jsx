import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";

const Navbar = ({ setLoginPopup }) => {
  const { token, setToken } = useContext(storeContext);
  const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (!storedToken) {
//       setLoginPopup(true);
//     }
//   }, [setLoginPopup]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = token ? [
    { to: "/", label: "Home" },
    { to: "/create-challenge", label: "Create" },
    { to: "/learning-nft", label: "NFTs" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/reward-token", label: "Rewards" },
    { to: "/dashboard", label: "Dashboard" },
  ] : [
    { to: "/", label: "Home" }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold hover:text-blue-200 transition duration-300">
              PopUp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                {item.label}
              </Link>
            ))}
            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setLoginPopup(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Login
              </button>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {token ? (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setLoginPopup(true);
                setIsMenuOpen(false);
              }}
              className="w-full text-left bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
