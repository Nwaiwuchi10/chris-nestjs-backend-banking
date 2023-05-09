import { Document, Schema, model } from 'mongoose';

export interface UserAccount extends Document {
  phoneNumber: string;
  password: string;
  accountNumber: string;
  pin: string;
}

const userAccountSchema = new Schema<UserAccount>({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  pin: { type: String, required: true, unique: true },
});

export const UserAccountModel = model<UserAccount>(
  'UserAccount',
  userAccountSchema,
);
