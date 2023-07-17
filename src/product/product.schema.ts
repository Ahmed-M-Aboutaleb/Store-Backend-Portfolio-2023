import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    seller: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    numReviews: number;

    @Prop({ required: true })
    approved: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
