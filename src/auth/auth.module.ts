import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  Transaction,
  TransactionSchema,
} from 'src/transaction/schemas/transaction.schema';
import { MailModule } from 'src/mail/mail.module';
import { TransferSchema } from 'src/transfer/schemas/transfer.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Transfer', schema: TransferSchema }]),
    MailModule,
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
