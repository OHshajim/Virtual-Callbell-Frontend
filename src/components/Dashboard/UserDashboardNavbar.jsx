import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCall } from "../../Provider/Provider";
import { ArrowLeft } from "lucide-react";

const UserDashboardNavLinks = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useCall();

  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    navigate(-1);
  };
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/", label: "Home" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/dashboard/subscriptions", label: "Subscriptions" },
    { href: "/dashboard/transactions", label: "Transaction" },
  ]

  return (
      <>
          <div className="flex flex-row justify-between items-center mb-8">
              <ArrowLeft
                  className="cursor-pointer border"
                  onClick={handleBack}
              />
              <h1 className="text-2xl font-bold">CallBell</h1>
          </div>
          <ul className="space-y-2 w-full flex flex-col">
              {" "}
              {links.map((l) => (
                <Link to={l.href} key={l.href} >
                  <li
                    className={`hover:bg-indigo-600 ${
                        pathname === l.href ? "bg-indigo-600" : ""
                    } px-3 py-2 w-full rounded-lg cursor-pointer transition `}
                  >
                    {l.label}
                  </li>
                </Link>
              ))}
              <li
                  onClick={handleLogout}
                  className={`hover:bg-indigo-600  px-3 py-2 rounded-lg cursor-pointer transition`}
              >
                  Logout
              </li>
          </ul>
      </>
  );
};

export default UserDashboardNavLinks;
