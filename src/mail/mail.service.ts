import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'djnchrys@gmail.com',
        pass: 'mictdtqklnuerfkg',
      },
    });
  }

  async sendRegistrationEmail(
    email: string,
    name: string,
    accountNumber: string,
    accountName: string,
  ) {
    const mailOptions = {
      from: 'djnchrys@gmail.com',
      to: email,
      subject: 'Welcome to Chris banking',
      text: `Hello ${name},
      \n\your bank Details has sucessfully been created,
       here is your Account details: Account Number:${accountNumber},
        Account Name:${accountName}, Bank Name:chrisBank, account balance:0.00`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
