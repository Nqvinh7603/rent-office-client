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
  chat-title="CyberBot"
  agent-id="5475d40f-1fa7-4a0b-a774-64cf6c792218"
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
