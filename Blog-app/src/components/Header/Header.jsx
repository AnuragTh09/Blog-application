import { Container, Logo, Logout } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { v4 as uuid } from 'uuid';
import { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { status: authStatus, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navItems = [
    {
      id: 1,
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      id: 2,
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      id: 3,
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      id: 4,
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      id: 5,
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <Container>
        <nav className="flex border border-gray-600 p-2 rounded-lg md:justify-start justify-between relative">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center ml-auto">
            {navItems.map((navItem) =>
              navItem.active ? (
                <li key={navItem.id}>
                  <button
                    onClick={() => navigate(navItem.slug)}
                    className="py-1 px-4 hover:bg-gray-700  hover:text-white hover:rounded-full hover:duration-200"
                  >
                    {navItem.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
            {userData && (
              <li>
                <p className="font-bold underline text-black cursor-pointer hover:text-gray-800">{userData.email}</p>

              </li>
            )}
          </ul>
          {/* Mobile Nav */}
          <div className="md:hidden block relative">
            <div
              onClick={handleMobileMenu}
              className="absolute right-0 top-6 flex flex-col gap-y-1 cursor-pointer"
            >
              <span className="w-8 h-[5px] bg-black"></span>
              <span className="w-8 h-[5px] bg-black"></span>
              <span className="w-8 h-[5px] bg-black"></span>
            </div>
          </div>
          {isMobileMenuOpen && (
            <ul className="md:hidden absolute top-20 w-full rounded-lg shadow-2xl bg-gray-100 z-10">
              {userData && (
                <li className="pb-4 border-b-2 hover:bg-blue-100 w-full border-slate-400">
                  <p className="font-bold py-2">{userData.email}</p>
                </li>
              )}
              <div className="py-1">
                {navItems.map((navItem) =>
                  navItem.active && navItem.name !== "Add Post" ? (
                    <li key={navItem.id}>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate(navItem.slug);
                        }}
                        className="w-full py-2 hover:bg-blue-100 hover:duration-200"
                      >
                        {navItem.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <Logout />
                  </li>
                )}
              </div>
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
