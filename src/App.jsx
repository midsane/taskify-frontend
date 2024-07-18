import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "./pages/Home";
import TopUsers from "./pages/users";
import RootLayout, { loader as RootLoader } from "./pages/RootLayout";
import Profile from "./pages/profile";
import ErrorPage from "./components/error";
import Auth, { action as authAction } from "./pages/auth";
import Logout from "./pages/logout/logout";
import { getUsersRank } from "./http/http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: RootLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "top-users", element: <TopUsers />, loader: getUsersRank },
      { path: "profile", element: <Profile />, loader: getUsersRank },
      { path: "auth", element: <Auth />, action: authAction },
    ],
  },
  { path: "/logout", element: <Logout /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
