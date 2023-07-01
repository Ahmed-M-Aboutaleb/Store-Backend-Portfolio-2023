import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class SigninDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
