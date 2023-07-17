import { IntersectionType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import UserDto from 'src/user/dto/user.dto';

export default class SignupDto extends IntersectionType(UserDto) {
    @IsOptional()
    id: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsOptional()
    role: number;
}
