import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly userID: string;
}
