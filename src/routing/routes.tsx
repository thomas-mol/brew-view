import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddReviewPage from "../pages/Add/AddReviewPage";
import EditReviewPage from "../pages/Edit/EditReviewPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add",
        element: <AddReviewPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "review/:id",
        element: <EditReviewPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  { path: "login", element: <LoginPage /> },
]);

export default router;
