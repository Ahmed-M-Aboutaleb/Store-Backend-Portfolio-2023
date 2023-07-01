import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class SignupDto {
    id?: string;
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
    @IsString()
    @IsNotEmpty()
    readonly secondName: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly address: string;
    @IsString()
    @IsNotEmpty()
    readonly city: string;
    @IsString()
    @IsNotEmpty()
    readonly state: string;
    @IsNumber()
    @IsNotEmpty()
    readonly zip: string;
    @IsString()
    @IsNotEmpty()
    readonly country: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
