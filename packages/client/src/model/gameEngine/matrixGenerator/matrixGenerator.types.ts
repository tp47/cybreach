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

type Sequence = string[];

type Sequences = Sequence[];

export type { MatrixGeneratorConfig, BoardMatrix, Sequence, Sequences };
