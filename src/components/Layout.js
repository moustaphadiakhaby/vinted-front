import { Outlet } from "react-router-dom";
import Header from "./Header"; // ⚠️ verify it's the correct path

const Layout = ({ params }) => {
  return (
    <>
      <Header params={params} />
      <Outlet />
    </>
  );
};

export default Layout;
