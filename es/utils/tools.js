export function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}