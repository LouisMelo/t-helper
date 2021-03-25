/* https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary */
export default (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
