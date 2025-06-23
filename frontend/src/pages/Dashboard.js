import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      navigate("/sign-in");
    }
  }, []);

  console.log(userState);

  if (!userState) return <></>;

  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
