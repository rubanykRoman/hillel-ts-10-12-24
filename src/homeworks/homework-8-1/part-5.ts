interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    if (this.items.some((existingItem) => existingItem.id === item.id)) {
      throw new Error(`Item with id ${item.id} already exists.`);
    }
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  removeById(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

class User implements Identifiable {
  constructor(
    public id: number,
    public name: string
  ) {}
}

class Product implements Identifiable {
  constructor(
    public id: number,
    public title: string,
    public price: number
  ) {}
}

//examples
const userRepository = new Repository<User>();
userRepository.add(new User(1, 'Alice'));
userRepository.add(new User(2, 'Bob'));
console.log('All users:', userRepository.getAll());
console.log('Get user by id 1:', userRepository.getById(1));
console.log('Get user by id 2:', userRepository.getById(2));
console.log('Remove user with id 2:', userRepository.removeById(2));
console.log('Remove user with wrong id:', userRepository.removeById(99));
console.log('All users after removal:', userRepository.getAll());

const productRepository = new Repository<Product>();
productRepository.add(new Product(1, 'Laptop', 3000));
productRepository.add(new Product(2, 'Phone', 1000));
console.log('All products:', productRepository.getAll());
console.log('Get product by id 1:', productRepository.getById(1));
console.log('Get product by id 2:', productRepository.getById(2));
console.log('Remove product with id 2:', productRepository.removeById(2));
console.log('Remove product with wrong id:', productRepository.removeById(99));
console.log('All products after removal:', productRepository.getAll());
