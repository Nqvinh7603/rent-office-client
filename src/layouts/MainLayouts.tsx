import Footer from "../common/Footer";
import Header from "../common/Headers/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default MainLayout;
