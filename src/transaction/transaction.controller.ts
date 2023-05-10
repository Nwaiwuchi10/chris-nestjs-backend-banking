import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './schemas/transaction.schema';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post('/deposits/:userId')
  deposits(
    @Param('userId') userId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.transactionService.deposits(userId, transactionDto);
  }

  @Post('/withdrawal/:userId')
  makeWithdrawal(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
    // @Body() transactionDto: TransactionDto,
  ) {
    return this.transactionService.makeWithdrawal(userId, amount);
  }

  @Get('/history/:userId')
  async getTransactionHistory(
    @Param('userId') userId: string,
  ): Promise<Transaction[]> {
    // code to retrieve transaction history for the user
    return await this.transactionService.getTransactionHistory(userId);
  }
}
