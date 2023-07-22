import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class UserDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
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
    readonly zip: number;
    @IsString()
    @IsNotEmpty()
    readonly country: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsNumber()
    @IsNotEmpty()
    readonly role: number;
}
