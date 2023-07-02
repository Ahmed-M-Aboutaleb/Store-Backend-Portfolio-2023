import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import SignupDto from './dto/signup.dto';
import SigninDto from './dto/signin.dto';

export interface Token {
    access_token: Promise<string> | string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async sginIn(dto: SigninDto): Promise<Token> {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (await argon2.verify(user.password, dto.password)) {
            const payload: { id: string; email: string } = {
                id: user.id,
                email: user.email,
            };
            const token = await this.jwtService.signAsync(payload);
            return { access_token: token };
        } else {
            throw new UnauthorizedException('Wrong password');
        }
    }

    async sginUp(dto: SignupDto): Promise<Token> {
        const hashPassword: string = await argon2.hash(dto.password);
        const id: string = await uuidv4();
        dto.id = id;
        dto.password = hashPassword;
        const user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            throw new UnauthorizedException('User already exists');
        }
        const createdUser = new this.userModel(dto);
        createdUser.save();
        const payload: { id: string; email: string } = {
            id: id,
            email: createdUser.email,
        };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
}
