import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly transactionType: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly createdAt: string;
}
