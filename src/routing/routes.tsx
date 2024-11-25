import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import AddReviewPage from "../pages/Add/AddReviewPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import App from "../App";
import ProfilePage from "../pages/Profile/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "add", element: <AddReviewPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "settings", element: <ProfilePage /> },
    ],
  },
]);

export default router;
