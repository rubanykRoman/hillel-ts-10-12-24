import {
  Bank,
  Client,
  DepositCommand,
  TransactionQueue,
  WithdrawCommand,
} from '../../homework-18-1/bank_account';
import IBankAccount from '../../homework-18-1/interfaces/IBankAccount';

describe('Bank System Integration Tests', () => {
  let bank: Bank;
  let transactionQueue: TransactionQueue;
  let clientJohn: Client;
  let account1: IBankAccount;
  let account2: IBankAccount;

  const testInitialBalanceAccount1 = 1000;
  const testInitialBalanceAccount2 = 500;
  const testDepositAmount = 200;
  const testWithdrawAmount = 50;
  const testExpectedBalanceAfterDeposit = 1200;
  const testExpectedBalanceAfterWithdraw = 450;
  const testExpectedBalanceAfterRepeat = 1400;
  const testExpectedBalanceAfterUndo = 500;

  beforeEach(() => {
    bank = Bank.getInstance();
    transactionQueue = new TransactionQueue();
    clientJohn = new Client('John', 'Doe');
    account1 = bank.createAccount(clientJohn, testInitialBalanceAccount1, 'USD');
    account2 = bank.createAccount(clientJohn, testInitialBalanceAccount2, 'EUR');
  });

  it('should create accounts correctly', () => {
    expect(clientJohn.getAccounts().length).toBe(2);
    expect(account1.balance).toBe(testInitialBalanceAccount1);
    expect(account2.balance).toBe(testInitialBalanceAccount2);
  });

  it('should process deposit and withdrawal transactions correctly', () => {
    const depositCmd: DepositCommand = new DepositCommand(account1, testDepositAmount);
    const withdrawCmd: WithdrawCommand = new WithdrawCommand(account2, testWithdrawAmount);

    transactionQueue.queueTransaction(depositCmd);
    transactionQueue.queueTransaction(withdrawCmd);

    expect(account1.balance).toBe(testExpectedBalanceAfterDeposit);
    expect(account2.balance).toBe(testExpectedBalanceAfterWithdraw);
  });

  it('should undo last transaction correctly', () => {
    const withdrawCmd: WithdrawCommand = new WithdrawCommand(account2, testWithdrawAmount);
    transactionQueue.queueTransaction(withdrawCmd);
    transactionQueue.undoLastTransaction();

    expect(account2.balance).toBe(testExpectedBalanceAfterUndo);
  });

  it('should repeat last transaction correctly', () => {
    const depositCmd: DepositCommand = new DepositCommand(account1, testDepositAmount);
    transactionQueue.queueTransaction(depositCmd);
    transactionQueue.repeatLastTransaction();

    expect(account1.balance).toBe(testExpectedBalanceAfterRepeat);
  });

  it('should close account correctly', () => {
    bank.closeAccount(account1);
    expect(clientJohn.getAccounts().length).toBe(1);
  });

  it('should retrieve transaction history correctly', () => {
    const depositCmd: DepositCommand = new DepositCommand(account1, testDepositAmount);
    transactionQueue.queueTransaction(depositCmd);

    expect(account1.getTransactionHistory().length).toBe(1);
  });
});
