import { BadRequestException, Injectable } from '@nestjs/common';
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

  async deposits(userId: string, transactionDto: TransactionDto) {
    const { amount, createdAt } = transactionDto;
    const user = await this.userModel.findById(userId).populate('transactions');

    if (!user) {
      throw new Error('User not found');
    }
    // const newBalance = user.accountBalance + amount;

    user.accountBalance += amount;

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const transaction = new this.transactionModel({
      userId,
      amount: amount,

      transactionType: 'deposit',
      createdAt,
    });
    await user.save();
    user.transactions.push(transaction._id);
    await transaction.save();

    return { message: 'Deposit successful' };
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
      amount: amount, // Withdrawals are represented as negative amounts
    });
    user.transactions.push(transaction._id);
    user.accountBalance -= amount;
    await user.save();
    await transaction.save();
    return { message: 'Your Withdrawal is successful' };
  }

  async getTransactionHistory(userId: string): Promise<Transaction[]> {
    // const { userId } = transactionDto;
    const user = await this.userModel.findById(userId).populate('transactions');
    return user.transactions;
  }
}
