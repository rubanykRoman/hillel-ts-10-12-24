import IBankAccount from './interfaces/IBankAccount';
import { TransactionType } from './types';
import IBank from './interfaces/IBank';
import Command from './interfaces/ICommand';

export class BankAccount implements IBankAccount {
  private _balance: number;
  private _owner: Client;
  private readonly _currency: string;
  private transactionHistory = new TransactionHistory();

  public readonly accountNumber = this.generateAccountNumber();

  public get balance(): number {
    return this._balance;
  }

  public get owner(): Client {
    return this._owner;
  }

  public get currency(): string {
    return this._currency;
  }

  public set owner(value: Client) {
    this._owner = value;
  }

  constructor(owner: Client, balance: number, currency: string) {
    this._balance = balance;
    this._owner = owner;
    this._currency = currency;
  }

  private deposit(amount: number): void {
    this._balance += amount;
    this.transactionHistory.addTransaction('deposit', amount);
    console.log(`Operation: Deposit. Balance: ${this.balance} ${this.currency}`);
  }

  private withdraw(amount: number): void {
    if (this._balance < amount) {
      throw new Error(`Not enough funds: requested ${amount}, available ${this._balance}`);
    }
    this._balance -= amount;
    this.transactionHistory.addTransaction('withdraw', amount);
    console.log(`Operation: Withdraw. Balance: ${this.balance} ${this.currency}`);
  }

  public processTransaction(type: TransactionType, amount: number): void {
    if (type === 'deposit') {
      this.deposit(amount);
    } else if (type === 'withdraw') {
      this.withdraw(amount);
    }
  }

  public getTransactionHistory(): ReadonlyArray<Transaction> {
    return this.transactionHistory.transactions;
  }

  private generateAccountNumber(): string {
    return `BASIC-${Math.floor(Math.random() * 1000)}`;
  }
}

export class Client {
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly accounts = new Map<string, IBankAccount>();

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public addAccount(account: IBankAccount): void {
    this.accounts.set(account.accountNumber, account);
  }

  public removeAccount(accountNumber: string): void {
    this.accounts.delete(accountNumber);
  }

  public getAccounts(): [string, IBankAccount][] {
    return Array.from(this.accounts.entries());
  }
}

export class Transaction {
  public readonly amount: number;
  public readonly date = Date.now();
  public readonly id: number;
  public readonly type: TransactionType;

  constructor(type: TransactionType, amount: number, id: number) {
    this.amount = amount;
    this.id = id;
    this.type = type;
  }
}

class TransactionHistory {
  private readonly _transactions: Transaction[] = [];
  private transactionIdCounter = 1;

  public get transactions(): ReadonlyArray<Transaction> {
    return this._transactions;
  }

  public addTransaction(type: TransactionType, amount: number): void {
    this._transactions.push(new Transaction(type, amount, this.transactionIdCounter));
    this.transactionIdCounter++;
  }
}

export class Bank implements IBank {
  private static instance: Bank;
  private accounts: IBankAccount[] = [];

  private constructor() {}

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public createAccount(owner: Client, balance: number, currency: string): IBankAccount {
    const account = new BankAccount(owner, balance, currency);
    this.accounts.push(account);
    owner.addAccount(account);
    console.log(`Account ${account.accountNumber} (${currency}) created for ${owner.fullName}`);
    return account;
  }

  public closeAccount(account: IBankAccount): void {
    this.accounts = this.accounts.filter((acc) => acc.accountNumber !== account.accountNumber);
    account.owner.removeAccount(account.accountNumber);
    console.log(`Account ${account.accountNumber} closed.`);
  }
}

export class DepositCommand implements Command {
  constructor(
    private account: IBankAccount,
    private amount: number
  ) {}
  execute(): void {
    this.account.processTransaction('deposit', this.amount);
  }
  undo(): void {
    this.account.processTransaction('withdraw', this.amount);
  }
}

export class WithdrawCommand implements Command {
  constructor(
    private account: IBankAccount,
    private amount: number
  ) {}
  execute(): void {
    this.account.processTransaction('withdraw', this.amount);
  }
  undo(): void {
    this.account.processTransaction('deposit', this.amount);
  }
}

export class TransactionQueue {
  private queue: Command[] = [];

  public queueTransaction(command: Command): void {
    command.execute();
    this.queue.push(command);
  }

  public undoLastTransaction(): void {
    const command = this.queue.pop();
    if (command) {
      command.undo();
    }
  }

  public repeatLastTransaction(): void {
    if (this.queue.length > 0) {
      const lastCommand = this.queue[this.queue.length - 1];
      if (lastCommand) {
        lastCommand.execute();
        this.queue.push(lastCommand);
      }
    }
  }
}

//examples
const bank = Bank.getInstance();
const transactionQueue = new TransactionQueue();

const clientJohn = new Client('John', 'Doe');

const account1 = bank.createAccount(clientJohn, 1000, 'USD');
const account2 = bank.createAccount(clientJohn, 500, 'EUR');

console.log("Client's accounts:", clientJohn.getAccounts());

const depositCmd = new DepositCommand(account1, 200);
const withdrawCmd = new WithdrawCommand(account2, 50);

transactionQueue.queueTransaction(depositCmd); // Deposit 200 to account1
transactionQueue.queueTransaction(withdrawCmd); // Withdraw 50 from account2

console.log('Account1 balance after deposit:', account1.balance, account1.currency);
console.log('Account2 balance after withdrawal:', account2.balance, account2.currency);

transactionQueue.undoLastTransaction();
console.log('Account2 balance after undoing withdrawal:', account2.balance, account2.currency);

transactionQueue.repeatLastTransaction();
console.log(
  'Account1 balance after repeating last transaction:',
  account1.balance,
  account1.currency
);

bank.closeAccount(account1);
console.log("Client's accounts after closing account1:", clientJohn.getAccounts());

console.log('Transaction History for Account1:');
console.log(account1.getTransactionHistory());

console.log('Transaction History for Account2:');
console.log(account2.getTransactionHistory());
