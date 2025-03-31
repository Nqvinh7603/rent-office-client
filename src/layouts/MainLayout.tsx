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
          <div
            dangerouslySetInnerHTML={{
              __html: `
            <df-messenger
        intent="WELCOME"
        chat-title="CT553"
        agent-id="8ac28f4a-e8b6-4b98-978e-ef21c42a985d"
        language-code="vi"
            ></df-messenger>
          `,
            }}
          />
          <ScrollToTop />
          <CartButton />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
