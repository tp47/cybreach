import seedrandom from "seedrandom";

function getRandomSeededInteger(
  min: number,
  max: number,
  seededRNG: seedrandom.PRNG
) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(seededRNG() * (max - min + 1)) + min;
}

export { getRandomSeededInteger };
