import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schemas/transaction.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async getUserId(userId: string) {
    // const { userId, amount } = transactionDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
  async deposit(userId: string, amount: number) {
    // const { userId, amount } = transactionDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.accountBalance += amount;
    await user.save();

    const transaction = await this.transactionModel.create({
      userId,
      amount,
      transactionType: 'deposit',
    });
    await transaction.save();

    return { transaction };
  }

  async makeWithdrawal(userId: string, amount: number) {
    // const { userId, amount } = transactionDto;

    const user = await this.userModel.findById(userId).populate('transactions');
    if (!user) {
      throw new Error('User not found');
    }
    if (user.accountBalance < amount) {
      throw new Error('Insufficient balance');
    }
    const transaction = await this.transactionModel.create({
      userId,
      transactionType: 'withdrawal',
      amount: -amount, // Withdrawals are represented as negative amounts
    });
    user.transactions.push(transaction);
    user.accountBalance -= amount;
    await user.save();
    await transaction.save();
    return { transaction };
  }

  async getTransactionHistory(userId: string): Promise<Transaction[]> {
    // const { userId } = transactionDto;
    const user = await this.userModel.findById(userId).populate('transactions');
    return user.transactions;
  }
}
