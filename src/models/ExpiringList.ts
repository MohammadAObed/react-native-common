export class ExpiringList<T> {
  private items: Map<T, number> = new Map();
  private expiryTime: number;

  constructor(expiryTimeInMs: number) {
    this.expiryTime = expiryTimeInMs;
    setInterval(this.cleanup.bind(this), 1000);
  }

  // Add an item to the list
  add(item: T): void {
    const timestamp = Date.now();
    this.items.set(item, timestamp);
  }

  // Remove an item from the list
  remove(item: T): boolean {
    return this.items.delete(item);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [item, timestamp] of this.items.entries()) {
      if (now - timestamp > this.expiryTime) {
        this.items.delete(item);
      }
    }
  }

  getItems(): T[] {
    return Array.from(this.items.keys());
  }

  has(item: T): boolean {
    return this.items.has(item);
  }
}
