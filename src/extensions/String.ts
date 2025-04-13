export {};

declare global {
  interface String {
    mCapitalizeSentences(): string;
    mReverse(): string;
    mIncludes(text: string, trim?: boolean, lowerCase?: boolean): boolean;
  }
}
String.prototype.mCapitalizeSentences = function (this: string): string {
  return this.replace(/(^\s*\w|[.]\s*\w|[\r\n]+\s*\w)/g, (match) => match.toUpperCase());
};
String.prototype.mReverse = function (this: String): string {
  return this.split("").reverse().join("");
};
String.prototype.mIncludes = function (this: String, text: string, trim = true, lowerCase = true): boolean {
  let leftText = this;
  let rightText = text;
  if (trim) {
    leftText = leftText.trim();
    rightText = rightText.trim();
  }
  if (lowerCase) {
    leftText = leftText.toLowerCase();
    rightText = rightText.toLowerCase();
  }
  return leftText.includes(rightText);
};
