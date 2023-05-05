import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';

// import { UserAccount } from './schema/users.schema';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel('UserAccount') private userModel: Model<UserAccount>,
//   ) {}

//   async create(
//     phoneNumber: string,
//     password: string,
//   ): Promise<{ token: string }> {
//     const existingUser = await this.userModel.findOne({ phoneNumber });
//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const accountNumber = phoneNumber;

//     const newUser = new this.userModel({
//       phoneNumber,
//       password: hashedPassword,
//       accountNumber,
//     });
//     const result = await newUser.save();

//     const token = jwt.sign(
//       { userId: result.id, phoneNumber: result.phoneNumber },
//       'secret',
//       { expiresIn: '1h' },
//     );

//     return { token };
//   }
// }
