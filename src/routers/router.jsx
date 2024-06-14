import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "../layouts/main-container";
import HomePage from "../pages/home"

import ErrorPage from "../pages/error"
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";
import NavBar from "../layouts/navbar"
import Footer from "../layouts/footer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    // TODO: ajouter loader 
    children : [
      {
        path:"",
        element: <HomePage/>
      },
      {
        path:"login",
        element: <LoginPage/>
      },
      {
        path:"profile",
        element: <ProfilePage/>
      }
    ]
  },
]);

function Root() {
  return (
    <>
    <NavBar/>
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer/> 
    </>
  );
}
