import { IntersectionType } from '@nestjs/mapped-types';
import OrderDto from './order.dto';
import { IsOptional } from 'class-validator';

export default class CreateOrderDto extends IntersectionType(OrderDto) {
    @IsOptional()
    id: string;
    @IsOptional()
    userId: string;
    @IsOptional()
    paymentIpAddress: string;
    @IsOptional()
    status: string;
}
