import { Outlet } from "react-router-dom";
import CartButton from "../common/CartButton";
import Footer from "../common/Footers/Footer";
import Header from "../common/Headers/Header";
import ScrollToTop from "../common/ScrollTop";

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        <div className="w-full">
          <ScrollToTop />
          <CartButton />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
