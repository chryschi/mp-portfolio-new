import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Page from "./Page";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/:name/:project?/:slideshow?", element: <Page /> },
    { path: "/:name/:project?/:projektbeschreibung?", element: <Page /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
