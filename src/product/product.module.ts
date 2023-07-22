import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorySchema } from 'src/category/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Product', schema: ProductSchema },
            { name: 'Category', schema: CategorySchema },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                global: true,
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}
