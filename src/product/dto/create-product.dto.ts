import { IntersectionType } from '@nestjs/mapped-types';
import ProductDto from './product.dto';
import { IsOptional } from 'class-validator';

export default class CreateProductDto extends IntersectionType(ProductDto) {
    @IsOptional()
    id: string;
    @IsOptional()
    seller: string;
    @IsOptional()
    approved: boolean;
    @IsOptional()
    numReviews: number;
    @IsOptional()
    rating: number;
}
