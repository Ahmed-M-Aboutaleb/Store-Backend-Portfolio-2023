import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ required: true })
    deliveryAddress: string;

    @Prop({ required: true })
    deliveryDate: Date;

    @Prop({ required: true })
    paymentIpAddress: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
