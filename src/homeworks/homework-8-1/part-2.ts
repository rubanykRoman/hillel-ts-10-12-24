class Queue<T> {
  private readonly items: T[] = [];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}

// examples
const queue = new Queue<number>([1, 2, 3, 4]);
queue.enqueue(5);
console.log(queue.peek());
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.size());
