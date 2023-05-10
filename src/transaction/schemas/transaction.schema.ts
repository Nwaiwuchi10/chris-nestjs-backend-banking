import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

// export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  transactionType: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
