type MatrixGeneratorConfig = {
  minMatrixSize: number;
  maxMatrixSize: number;

  minSequencesAmount: number;
  maxSequencesAmount: number;
  minSequenceLength: number;

  minBufferSize: number;
  maxBufferSize: number;

  differentMatrixValuesAmount: number;
  matrixValues: string[];
  emptyMatrixValue: string;
};

type BoardMatrix = string[];

type BoardSequence = string[];

type BoardSequences = BoardSequence[];

export type {
  MatrixGeneratorConfig,
  BoardMatrix,
  BoardSequence,
  BoardSequences,
};
