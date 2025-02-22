import { Client } from '../bank_account';

export default interface IBankAccount {
  readonly accountNumber: string;
  readonly balance: number;
  owner: Client;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}
