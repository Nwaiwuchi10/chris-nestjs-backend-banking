import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './schemas/transaction.schema';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/deposit/:userId')
  deposit(
    @Param('userId') userId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.transactionService.deposit(userId, transactionDto);
  }
  @Post('/withdrawal/:userId')
  makeWithdrawal(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
    // @Body() transactionDto: TransactionDto,
  ) {
    return this.transactionService.makeWithdrawal(userId, amount);
  }
  // @Get(':userId')
  // async getUserId(@Param('userId') userId: string) {
  //   // code to retrieve transaction history for the user
  //   return await this.transactionService.getUserId(userId);
  // }
  @Get(':userId/')
  async getTransactionHistory(
    @Param('userId') userId: string,
  ): Promise<Transaction[]> {
    // code to retrieve transaction history for the user
    return await this.transactionService.getTransactionHistory(userId);
  }
}
