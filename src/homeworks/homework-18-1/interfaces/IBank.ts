import IBankAccount from './IBankAccount';
import { Client } from '../bank_account';

export default interface IBank {
  createAccount(owner: Client, balance: number, currency: string): IBankAccount;
  closeAccount(account: IBankAccount): void;
}
