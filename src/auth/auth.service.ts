import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import SignupDto from './dto/signup.dto';
import SigninDto from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import UserDto from 'src/user/dto/user.dto';

export interface Token {
    access_token: Promise<string> | string;
}

const MEMBER_ROLE = 0;

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userModelService: UserService,
    ) {}

    async sginIn(dto: SigninDto): Promise<Token> {
        const user = await this.userModelService.findOne(dto.email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (await argon2.verify(user.password, dto.password)) {
            const payload: { id: string; email: string; role: number } = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            const token = await this.jwtService.signAsync(payload);
            return { access_token: token };
        } else {
            throw new UnauthorizedException('Wrong password');
        }
    }

    async sginUp(dto: SignupDto): Promise<Token> {
        const user = await this.userModelService.findOne(dto.email);
        if (user) {
            throw new UnauthorizedException('User already exists');
        }
        const hashPassword: string = await argon2.hash(dto.password);
        const id: string = await uuidv4();
        dto.id = id;
        dto.password = hashPassword;
        dto.role = MEMBER_ROLE;
        const createdUser = await this.userModelService.create(dto as UserDto);
        const payload: { id: string; email: string; role: number } = {
            id: id,
            email: createdUser.email,
            role: createdUser.role,
        };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
}
