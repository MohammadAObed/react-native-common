const MaxLoopIteration = 10000;
/**
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 */
export function getRandomNumber(min: number, max: number, dontMatchNumbers: number[] = []) {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  const validDontMatchNumbers = dontMatchNumbers.filter((num) => num >= min && num <= max);
  const totalNumbers = max - min + 1;
  if (validDontMatchNumbers.length >= totalNumbers) {
    throw new Error("No valid numbers to generate. All possibilities are excluded.");
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
