import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  Transaction,
  TransactionSchema,
} from 'src/transaction/schemas/transaction.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, unique: true })
  phoneNumber: number;

  @Prop({ required: true })
  accountNumber: number;

  @Prop({})
  accountName: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true, default: '0' })
  accountBalance: number;

  @Prop([{ type: Types.ObjectId, ref: 'Transaction' }])
  transactions: Transaction[];
}
export const UserSchema = SchemaFactory.createForClass(User);
