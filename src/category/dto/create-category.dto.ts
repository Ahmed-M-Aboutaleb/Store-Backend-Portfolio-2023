import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import CategoryDto from './category.dto';

export default class CreateCategoryDto extends IntersectionType(CategoryDto) {
    @IsOptional()
    id: string;
}
