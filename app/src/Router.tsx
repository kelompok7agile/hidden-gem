import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/public/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import LandingPage from "./pages/public/LandingPage";
import Profil from "./pages/public/profil";
import FormProfil from "./pages/public/profil/form";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <LandingPage />, // Set LandingPage as the default route
  },
  {
    path: "/app",
    element: <Applayout />,
    children: [
      {
        path: "/app",
        element: <Dashboard />,
      },
      {
        path: "sample",
        element: <Sample />,
      },
      {
        path: "empty",
        element: <Empty />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "profil/ubah",  
        element: <FormProfil />,
      }
    ],
  },
  // {
  //   path: "/admin",
  //   element: <Applayout />,
  // },
  {
    path: "*",
    element: <NoMatch />,
  },
], {
  // basename: global.basename || "/",
});
