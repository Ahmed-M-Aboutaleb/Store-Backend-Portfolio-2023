import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class OrderDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    @IsString()
    @IsNotEmpty()
    readonly userId: string;
    @IsString()
    @IsNotEmpty()
    readonly productId: string;
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number;
    @IsString()
    @IsNotEmpty()
    readonly status: string;
    @IsNumber()
    @IsNotEmpty()
    readonly totalPrice: number;
    @IsString()
    @IsNotEmpty()
    readonly deliveryAddress: string;
    @IsDate()
    @IsNotEmpty()
    readonly deliveryDate: Date;
    @IsString()
    @IsNotEmpty()
    paymentIpAddress: string;
}
