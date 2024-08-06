import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  @IsString()
  readonly senderId: string;
  @IsNotEmpty()
  @IsString()
  readonly receiverId: string;
  @IsNotEmpty()
  @IsString()
  readonly transactionType: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly narration: string;

  @IsNotEmpty()
  @IsString()
  readonly createdAt: string;
  @IsNotEmpty()
  @IsString()
  readonly transactionPin: string;
}
