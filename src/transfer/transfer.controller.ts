import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './dto/transfer';
import { Transfer } from './schemas/transfer.schema';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}
  @Post('/:userId/')
  makeatransfer(
    @Param('userId') _id: string,
    @Body()
    transferDto: TransferDto,
  ) {
    return this.transferService.makeatransfer(transferDto, _id);
  }
}
