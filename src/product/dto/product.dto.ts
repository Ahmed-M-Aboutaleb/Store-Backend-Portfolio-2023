import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class ProductDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;
    @IsString()
    @IsNotEmpty()
    readonly image: string;
    @IsString()
    @IsNotEmpty()
    readonly category: string;
    @IsString()
    @IsNotEmpty()
    readonly seller: string;
    @IsNumber()
    @IsNotEmpty()
    readonly rating: number;
    @IsNumber()
    @IsNotEmpty()
    numReviews: number;
    @IsNotEmpty()
    @IsBoolean()
    approved: boolean;
}
