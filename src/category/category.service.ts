import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import CategoryDto from './dto/category.dto';
import CreateCategoryDto from './dto/create-category.dto';
import IdDto from 'src/product/dto/id.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) {}

    async findAll(): Promise<CategoryDto[]> {
        return await this.categoryModel.find();
    }

    async findOne(id: string): Promise<CategoryDto> {
        return await this.categoryModel.findById(id);
    }

    async create(category: CreateCategoryDto): Promise<CategoryDto> {
        category.id = await uuidv4();
        return await this.categoryModel.create(category);
    }

    async update(id: IdDto, category: CreateCategoryDto): Promise<CategoryDto> {
        return await this.categoryModel.findByIdAndUpdate(id, category, {
            new: true,
        });
    }

    async delete(id: IdDto): Promise<CategoryDto> {
        return await this.categoryModel.findByIdAndDelete(id);
    }
}
