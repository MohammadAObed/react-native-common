export {};

declare global {
  interface Error {
    _handled?: boolean;
  }
}
