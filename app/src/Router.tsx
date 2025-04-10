import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/public/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import LandingPage from "./pages/public/LandingPage";

export const router = createBrowserRouter([
    {
      path: "/landing-page",
      index: true,
      element: <LandingPage />,
    },
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/",
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
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
], {
    // basename: global.basename || "/",
})
