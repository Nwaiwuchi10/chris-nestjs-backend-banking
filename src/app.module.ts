import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { MailModule } from './mail/mail.module';
import { CorsModule } from 'cors';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),

    // UsersModule,

    AuthModule,

    TransactionModule,

    MailModule,
    CorsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
