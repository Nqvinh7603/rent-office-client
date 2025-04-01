import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import Deposit from "../pages/Deposit";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OfficeDetailPage from "../pages/OfficeDetailPage";
import OfficeListPage from "../pages/OfficeListPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PrivacySecure from "../pages/PrivacySecure";
import UpdateDeposit from "../pages/UpdateDeposit";

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
        path: "/ky-gui",
        children: [
          {
            path: "",
            index: true,
            element: <Deposit />,
          },
          {
            path: ":consignmentId",
            element: <UpdateDeposit />,
          },
        ],
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
        element: <PrivacyPolicy />,
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
