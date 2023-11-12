import { getRandomSeededInteger } from "@/lib";
import seedrandom from "seedrandom";
import {
  BoardMatrix,
  MatrixGeneratorConfig,
  Sequence,
  Sequences,
} from "./matrixGenerator.types";

class MatrixGenerator {
  private level: number;
  private seed: string;

  private minMatrixSize: number;
  private maxMatrixSize: number;

  private minSequencesAmount: number;
  private maxSequencesAmount: number;
  private minSequenceLength: number;

  private minBufferSize: number;
  private maxBufferSize: number;

  private differentMatrixValuesAmount: number;
  private matrixValues: string[];
  private emptyMatrixValue: string;

  // Math.random() always returns a random value
  // But we need a seed random number generator
  private seededRNG: seedrandom.PRNG;

  private _matrix: BoardMatrix;
  private _sequences: Sequences;

  constructor(level: number, seed: string, config: MatrixGeneratorConfig) {
    this.level = level;
    this.seed = seed;

    this.minMatrixSize = config.minMatrixSize;
    this.maxMatrixSize = config.maxMatrixSize;

    this.minSequencesAmount = config.minSequencesAmount;
    this.maxSequencesAmount = config.maxSequencesAmount;
    this.minSequenceLength = config.minSequenceLength;

    this.minBufferSize = config.minBufferSize;
    this.maxBufferSize = config.maxBufferSize;

    this.differentMatrixValuesAmount = config.differentMatrixValuesAmount;
    this.matrixValues = config.matrixValues;
    this.emptyMatrixValue = config.emptyMatrixValue;

    this.seededRNG = seedrandom(seed);

    this._matrix = this.generateMatrix(8);
    this._sequences = this.generateSequences(
      this._matrix,
      3,
      this.maxBufferSize
    );
  }

  private generateSequences(
    matrix: BoardMatrix,
    sequencesAmount: number,
    maxBufferLength: number
  ): Sequences {
    const sequences: Sequences = [];

    for (let i = 0; i < sequencesAmount; i++) {
      const sequenceLength = getRandomSeededInteger(
        this.minSequenceLength,
        maxBufferLength,
        this.seededRNG
      );
      const sequence = this.generateSequence(this._matrix, sequenceLength);
      sequences.push(sequence);
    }

    return sequences;
  }

  private generateSequence(matrix: BoardMatrix, length: number): Sequence {
    const matrixSize = Math.sqrt(matrix.length);
    const matrixCopy: BoardMatrix = Object.assign([], matrix);

    let currentRow = 0;
    let currentColumn = 0;
    let searchInRow = true;

    const sequence: Sequence = [];

    // always statrt in the first line
    for (let i = 0; i < length; i++) {
      let matrixIndex = -1;
      if (searchInRow) {
        while (matrixIndex === -1) {
          currentColumn = getRandomSeededInteger(
            0,
            matrixSize - 1,
            this.seededRNG
          );
          matrixIndex = this.getMatrixIndex(
            matrixSize,
            currentRow,
            currentColumn
          );

          if (matrixCopy[matrixIndex] === this.emptyMatrixValue) {
            matrixIndex = -1;
          }

          if (
            i < length - 1 &&
            this.getValuesLeftInColumn(matrixCopy, currentColumn) < 2
          ) {
            matrixIndex = -1;
          }
        }
        searchInRow = false;
      } else {
        while (matrixIndex === -1) {
          currentRow = getRandomSeededInteger(
            0,
            matrixSize - 1,
            this.seededRNG
          );
          matrixIndex = this.getMatrixIndex(
            matrixSize,
            currentRow,
            currentColumn
          );

          if (matrixCopy[matrixIndex] === this.emptyMatrixValue) {
            matrixIndex = -1;
          }

          if (
            i < length - 1 &&
            this.getValuesLeftInRow(matrixCopy, currentRow) < 2
          ) {
            matrixIndex = -1;
          }
        }
        searchInRow = true;
      }

      matrixIndex = this.getMatrixIndex(matrixSize, currentRow, currentColumn);
      sequence.push(matrix[matrixIndex]);
      matrixCopy[matrixIndex] = this.emptyMatrixValue;
    }

    return sequence;
  }

  private generateMatrix(matrixSize: number): BoardMatrix {
    const matrixSquare = matrixSize * matrixSize;
    const matrix: BoardMatrix = [];

    for (let i = 0; i < matrixSquare; i++) {
      matrix.push(this.getRandomMatrixElement());
    }

    return matrix;
  }

  public get matrix(): BoardMatrix {
    return this._matrix;
  }

  public get sequences(): Sequences {
    return this._sequences;
  }

  private getMatrixIndex(
    matrixSize: number,
    row: number,
    column: number
  ): number {
    return row * matrixSize + column;
  }

  private getValuesLeftInColumn(matrix: BoardMatrix, column: number): number {
    const matrixSize = Math.sqrt(matrix.length);
    let valuesLeft = 0;
    for (let i = 0; i < matrixSize; i++) {
      const matrixIndex = this.getMatrixIndex(matrixSize, i, column);
      if (matrix[matrixIndex] !== this.emptyMatrixValue) {
        valuesLeft++;
      }
    }

    return valuesLeft;
  }

  private getValuesLeftInRow(matrix: BoardMatrix, row: number): number {
    const matrixSize = Math.sqrt(matrix.length);
    let valuesLeft = 0;
    for (let i = 0; i < matrixSize; i++) {
      const matrixIndex = this.getMatrixIndex(matrixSize, row, i);
      if (matrix[matrixIndex] !== this.emptyMatrixValue) {
        valuesLeft++;
      }
    }

    return valuesLeft;
  }

  private getRandomMatrixElement(): string {
    const randomElementIndex = getRandomSeededInteger(
      0,
      this.matrixValues.length - 1,
      this.seededRNG
    );
    return this.matrixValues[randomElementIndex];
  }
}

export default MatrixGenerator;
