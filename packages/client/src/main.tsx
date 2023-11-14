import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/configure";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Forum,
  ForumTopic,
  Game,
  LeaderBoard,
  Profile,
  SignIn,
  SignUp,
  Error,
} from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
