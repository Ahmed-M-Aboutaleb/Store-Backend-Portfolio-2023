import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                global: true,
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        UserModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
