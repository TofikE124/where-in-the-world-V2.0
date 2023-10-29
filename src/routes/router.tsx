import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import CountryDetailsPage from "./CountryDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/country/:countryName", element: <CountryDetailsPage /> },
    ],
  },
]);

export default router;
