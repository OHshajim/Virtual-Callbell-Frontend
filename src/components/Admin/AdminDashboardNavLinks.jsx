import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCall } from "../../Provider/Provider";
import { ArrowLeft } from "lucide-react";

const AdminDashboardNavLinks = () => {
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
          pathname === "/admin" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin"}>Dashboard</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/"}>Home</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/users" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/users"}>All Users</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/subscriptions" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/subscriptions"}>All Subscriptions</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/transactions" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/transactions"}>All Transaction</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/settings" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/settings"}>Setting</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/about" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/about"}>About</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/contact" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/contact"}>Contact</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/terms" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/terms"}>Terms</Link>
      </li>
      <li
        className={`hover:bg-indigo-600 ${
          pathname === "/admin/privacy" ? "bg-indigo-600" : ""
        } px-3 py-2 rounded-lg cursor-pointer transition `}>
        <Link to={"/admin/privacy"}>Privacy</Link>
      </li>
      <li
        onClick={handleLogout}
        className={`hover:bg-indigo-600  px-3 py-2 rounded-lg cursor-pointer transition`}>
        Logout
      </li>
    </>
  );
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8">
        <ArrowLeft className="cursor-pointer border" onClick={handleBack} />
        <h1 className="text-2xl font-bold">CallBell</h1>
      </div>
      <ul className="space-y-1">{ulLinks}</ul>
    </div>
  );
};

export default AdminDashboardNavLinks;
