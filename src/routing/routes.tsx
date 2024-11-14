import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import AddReviewPage from "../components/AddReviewPage/AddReviewPage";
import FavoritesPage from "../components/FavoritesPage/FavoritesPage";
import App from "../App";
import ProfilePage from "../components/ProfilePage/ProfilePage";

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
