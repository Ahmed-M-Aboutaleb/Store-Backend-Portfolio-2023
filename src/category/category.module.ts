import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategorySchema } from './category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
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
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
