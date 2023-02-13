import { Outlet } from "react-router-dom";
import Header from "./Header"; // ⚠️ verify it's the correct path

const Layout = ({ params, publishParams }) => {
  return (
    <>
      <Header params={params} publishParams={publishParams} />
      <Outlet />
    </>
  );
};

export default Layout;
