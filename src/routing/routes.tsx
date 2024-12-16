import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import AddReviewPage from "../pages/Add/AddReviewPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import App from "../App";
import ProfilePage from "../pages/Profile/ProfilePage";
import EditReviewPage from "../pages/Edit/EditReviewPage";
import { NotFoundPage } from "../pages/404/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "add", element: <AddReviewPage /> },
      { path: "review/:id", element: <EditReviewPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "settings", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
