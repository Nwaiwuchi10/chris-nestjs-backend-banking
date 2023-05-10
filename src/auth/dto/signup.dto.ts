import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  readonly phoneNumber: string;
  readonly bankName: string;
  readonly accountName: string;
  readonly accountNumber: string;
  readonly transactions: [];
}
