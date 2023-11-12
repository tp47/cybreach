import { Game } from "@/model";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const game = new Game(canvasRef.current, {
      seed: "123",
      level: 12,
    });
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}

export default App;
