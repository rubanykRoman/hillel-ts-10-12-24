import { Client, Transaction } from '../bank_account';
import { TransactionType } from '../types';

export default interface IBankAccount {
  readonly accountNumber: string;
  readonly balance: number;
  readonly currency: string;
  owner: Client;
  processTransaction(type: TransactionType, amount: number): void;
  getTransactionHistory(): ReadonlyArray<Transaction>;
}
