import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema()
export class Transfer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: User;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiverId: User;
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  transactionType: string;
  @Prop({})
  narration: string;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  transactionPin: User;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
