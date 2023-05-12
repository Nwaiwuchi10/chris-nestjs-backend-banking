import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const { name, email, password, phoneNumber, transactions } = signUpDto;

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
    // const token=this.jwtService.sign({
    //   id: user._id,
    // });

    await this.mailService.sendRegistrationEmail(
      email,
      name,
      accountNumber,
      accountName,
    );
    return {
      //  token: this.jwtService.sign({ Id: user._id }),

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

    // this.jwtService.sign({_id: user._id });

    return {
      email: user.email,
      name: user.name,
      accountNumber: user.accountNumber,
      accountName: user.accountName,
      bankName: user.bankName,
      phoneNumber: user.phoneNumber,
      _id: user._id,
      // user,
      // token: this.jwtService.sign({ email }),
    };
  }
  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findById(_id: string) {
    const user = await this.userModel.findById(_id).populate('transactions');
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
