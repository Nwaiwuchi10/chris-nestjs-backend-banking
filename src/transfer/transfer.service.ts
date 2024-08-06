import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transfer } from './schemas/transfer.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { TransferDto } from './dto/transfer';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel('Transfer') private transferModel: Model<Transfer>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async makeatransfer(transferDto: TransferDto, _id: string) {
    const { amount, createdAt, narration, senderId } = transferDto;
    const receiver = await this.userModel.findById(_id).populate('transfers');
    const sender = await this.userModel.findById(_id).populate('transfers');
    const transactionUserPin = await this.userModel
      .findById(_id)
      .populate('transfers');

    if (!sender) {
      throw new Error('User not found');
    }
    if (!receiver) {
      throw new Error('User not found');
    }
    if (sender.accountBalance < amount) {
      throw new Error(
        'Insufficient balance to send money out from your account',
      );
    }
    receiver.accountBalance += amount;
    sender.accountBalance -= amount;
    // const newBalance = user.accountBalance + amount;

    if (amount <= 100) {
      throw new BadRequestException('Amount must be above 100');
    }
    const receiverAccNumber = receiver.accountNumber;
    if (!receiverAccNumber) {
      throw new Error('Invalid Account Number');
    }
    const transPin = transactionUserPin.transactionPin;
    if (!transPin) {
      throw new Error('Pls Put Your transaction Pin');
    }
    const transfer = new this.transferModel({
      receiverId: receiverAccNumber,
      senderId,
      transactionPin: transPin,
      amount,
      narration,
      transactionType: 'Transfer',
      createdAt,
    });
    await receiver.save();
    await sender.save();

    receiver.transfers.push(transfer._id);

    sender.transfers.push(transfer._id);
    await transfer.save();

    return { message: 'Transfer successful' };
  }
}
