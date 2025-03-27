export {};

declare global {
  interface String {
    mReverse(): string;
    mIncludes(text: string, trim?: boolean, lowerCase?: boolean): boolean;
  }
}

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
