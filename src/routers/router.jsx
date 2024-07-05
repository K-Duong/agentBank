import { Outlet, createBrowserRouter } from "react-router-dom";
import MainContainer from "../layouts/main-container";
import HomePage from "../pages/home";

import ErrorPage from "../pages/error";
import ProfilePage from "../pages/profile";
import TransactionPage from "../pages/transactions";
import LoginPage from "../pages/login";
import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ProtectorRoute from "../components/protectorRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <ProtectorRoute />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "transactions",
            element: <TransactionPage />,
          },
        ],
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <NavBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
}
