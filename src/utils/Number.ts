import { GAUSSIAN, THRESHOLD } from "../constants";
import { ErrorCommon } from "../models";

const MaxLoopIteration = 10000;
/**
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 */
export function getRandomNumber(min: number, max: number, dontMatchNumbers: number[] = []) {
  if (min > max) {
    throw new ErrorCommon("min must be less than or equal to max");
  }
  const validDontMatchNumbers = dontMatchNumbers.filter((num) => num >= min && num <= max);
  const totalNumbers = max - min + 1;
  if (validDontMatchNumbers.length >= totalNumbers) {
    throw new ErrorCommon("No valid numbers to generate. All possibilities are excluded.");
  }
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let maxCount = 0;
  while (validDontMatchNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    maxCount += 1;
    if (maxCount > MaxLoopIteration) {
      break;
    }
  }
  return randomNumber;
}

/**
 * fast start, slow end. returns value approximatly from 1 to 0
 */
export function generateGaussianNumber(integer: number, threshold = THRESHOLD) {
  const result = (1 / (Math.sqrt(2 * Math.PI) * integer)) * Math.exp(-(GAUSSIAN * GAUSSIAN) / (2 * integer * integer)) + threshold;
  return result;
}
