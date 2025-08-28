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

  const ulLinks = (
    <>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/dashboard" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/"}>Home</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/dashboard/profile" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/dashboard/profile"}>Profile</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/dashboard/subscriptions" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/dashboard/subscriptions"}>Subscriptions</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/dashboard/transactions" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/dashboard/transactions"}>Transaction</Link>
      </li>
      <li
        onClick={handleLogout}
        className={`hover:bg-indigo-600  px-3 py-2 rounded-lg cursor-pointer transition`}>
        Logout
      </li>
    </>
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <ArrowLeft className="cursor-pointer border" onClick={handleBack} />
        <h1 className="text-2xl font-bold">CallBell</h1>
      </div>
      <ul className="space-y-1">{ulLinks}</ul>
    </>
  );
};

export default UserDashboardNavLinks;
