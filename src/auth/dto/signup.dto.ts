import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import UserDto from 'src/user/dto/user.dto';

export default class SignupDto extends PartialType(UserDto) {
    id?: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    role?: number;
}
