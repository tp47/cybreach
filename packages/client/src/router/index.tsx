import { createBrowserRouter } from "react-router-dom";
import {
  Forum,
  ForumTopic,
  Game,
  LeaderBoard,
  Profile,
  SignIn,
  SignUp,
  Error,
} from "../components";
import Main from "@/components/pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
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
