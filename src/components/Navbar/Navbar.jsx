import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCall } from "../../Provider/Provider";
import QrScanner from "../Dashboard/QrScaner";

const Navbar = () => {
  const { user, logout } = useCall();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const ulLInks = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/about"}>About us</Link>
      </li>
      <li>
        <Link to={"/privacy"}>Privacy Policy</Link>
      </li>
      <li>
        <Link to={"/terms"}>Terms of use</Link>
      </li>
      <li>
        <Link to={"/contact"}>Contact us</Link>
      </li>
      {user?.id && (
        <li>
          {user.role === "user" && <Link to={"/dashboard"}>Dashboard</Link>}
          {user.role === "admin" && <Link to={"/admin"}>Admin Panel</Link>}
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-black shadow-sm text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
            {ulLInks}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl font-bold text-white font-serif">
          CallBell
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">{ulLInks}</ul>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:inline">
          {user?.id ? (
            <>
              <button onClick={logout} className="btn">
                Logout
              </button>
            </>
          ) : (
            <div>
              <Link to={"/login"} className="btn">
                Login
              </Link>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <>
            {user?.id ? (
              <>
                <button onClick={handleLogout} className="btn">
                  Logout
                </button>
              </>
            ) : (
              <div>
                <Link to={"/login"} className="btn">
                  Login
                </Link>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
