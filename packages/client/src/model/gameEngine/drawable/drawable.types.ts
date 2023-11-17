type StrokeStyle = string | CanvasGradient | CanvasPattern;

type Coordinates = {
  x: number;
  y: number;
};

type Sizes = {
  width: number;
  height: number;
};

type RectDimensions = Coordinates & Sizes;

export type { StrokeStyle, RectDimensions, Coordinates, Sizes };
