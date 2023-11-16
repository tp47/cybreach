import { Game } from "@/model";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const game = new Game(canvasRef.current, {
      seed: Math.random().toString(),
      level: 12,
    });

    return () => {
      game.destruct();
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;

/* import { RouterProvider } from "react-router-dom";
import { router } from "../router";

function App() {
  return <RouterProvider router={router} />; */
}

export default App;
