import { Outlet } from "react-router-dom";
import Footer from "../common/Footers/Footer";
import Header from "../common/Headers/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
