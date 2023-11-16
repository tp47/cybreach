import { createBrowserRouter } from "react-router-dom";
import {
  Forum,
  ForumTopic,
  Game,
  LeaderBoard,
  Profile,
  Error,
  Main,
} from "../components";

import { LoginPage, RegisterPage } from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "signin",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <RegisterPage />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "game",
    element: <Game />,
  },
  {
    path: "leaderboard",
    element: <LeaderBoard />,
  },
  {
    path: "forum",
    element: <Forum />,
  },
  {
    path: "forum/:id",
    element: <ForumTopic />,
  },
]);
