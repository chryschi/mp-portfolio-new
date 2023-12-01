import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Aktuelles from "../pages/Aktuelles/Aktuelles";
import Page from "./Page";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/:name/:project?", element: <Page /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
