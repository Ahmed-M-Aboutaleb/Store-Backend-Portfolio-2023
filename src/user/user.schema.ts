import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    secondName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    zip: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
