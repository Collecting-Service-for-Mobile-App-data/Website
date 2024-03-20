// Imports from 'react-router-dom' for navigation, 'useAuthSelector' for authentication state, and 'useState' for local state management
import { Link } from "react-router-dom";
import { useAuthSelector } from "../auth/Auth";
import { useState } from "react";


// Navbar component definition
export const Navbar = () => {
  // Destructuring 'user' and 'logout' from the custom authentication hook
  const { user, logout } = useAuthSelector();
  // State for managing the mobile navigation menu's visibility
  const [isOpen, setIsOpen] = useState(false);
  // Function to toggle the navigation menu's open/close state
  const toggle = () => {
    setIsOpen((p) => !p);
  };

   // JSX structure of the Navbar component
  return (
    <nav className=" ">
      <div className=" flex  items-center justify-between mx-auto p-4 max-md:flex-wrap">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="Cordel_logo.png" alt="Cordel" style={{height: '80px'}} />
        </a>
        {/* <div>Hey, {user.isAuthenticated ? user.data?.name : "Guest"}</div> */}
        {/* Hamburger menu button for mobile view */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:text-black  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggle}
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon SVG */}
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation links, shown or hidden based on the `isOpen` state */}
        <div
          className={[
            " flex flex-row gap-2  items-center  max-md:w-full max-md:mt-6  max-md:items-stretch ",
            isOpen ? "max-md:flex-col" : "max-md:hidden",
          ].join(" ")}
        >
          {/* Conditionally render navigation links based on authentication state */}
          {user.isAuthenticated ? (
            <>
            {/* Links available to authenticated users */}
              <Link className="border border-white py-2 px-3 rounded" to="/">
                Customers
              </Link>
              <Link
                className="border border-white py-2 px-3 rounded"
                to="/sql-errors"
              >
                SQL Errors
              </Link>
              {/* Logout link triggers the logout function on click */}
              <Link
                to={"#"}
                onClick={logout}
                className="block py-2 px-3 border text-black rounded hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Log out
              </Link>
            </>
          ) : (
            <Link
            //Login link for users who are not authenticated
              to={"login"}
              className="block py-2 px-3  text-black rounded hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
