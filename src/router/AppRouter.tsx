import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import Contact from "../pages/Contact";
import Deposit from "../pages/Deposit";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OfficeDetailPage from "../pages/OfficeDetailPage";
import OfficeListPage from "../pages/OfficeListPage";
import PrivacySecure from "../pages/PrivacySecure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "ky-gui",
        element: <Deposit />,
      },
      {
        path: "gioi-thieu-ve-cyber-real",
        element: <AboutPage />,
      },
      {
        path: "chinh-sach-bao-mat",
        element: <PrivacySecure />,
      },
      {
        path: "chinh-sach-quyen-rieng-tu",
        element: <PrivacySecure />,
      },
      {
        path: "lien-he",
        element: <Contact />,
      },
      {
        path: "chon-di-xem",
        element: <CartPage />,
      },
      {
        path: "van-phong",
        children: [
          {
            path: "",
            index: true,
            element: <OfficeListPage />,
          },
          {
            path: ":id",
            element: <OfficeDetailPage />,
          },
        ],
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
