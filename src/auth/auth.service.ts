import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  // const mailConfig = this.configService.get('mail');

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password, phoneNumber, transactions, bankName } =
      signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = phoneNumber;
    const accountName = name;
    const user = await this.userModel.create({
      name,
      email,
      phoneNumber,
      transactions,
      accountNumber,
      accountName,
      bankName: 'chrisBank',
      password: hashedPassword,
    });
    await user.save();
    this.jwtService.sign({
      id: user._id,
    });

    await this.mailService.sendRegistrationEmail(
      email,
      name,
      accountNumber,
      accountName,
      bankName,
    );
    return {
      email: user.email,
      name: user.name,
      accountNumber: user.accountNumber,
      accountName: user.accountName,
      bankName: user.bankName,
      phoneNumber: user.phoneNumber,
      _id: user._id,
    };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.jwtService.sign({ id: user._id });

    return {
      email: user.email,
      name: user.name,
      accountNumber: user.accountNumber,
      accountName: user.accountName,
      bankName: user.bankName,
      phoneNumber: user.phoneNumber,
      _id: user._id,
    };
  }
}
