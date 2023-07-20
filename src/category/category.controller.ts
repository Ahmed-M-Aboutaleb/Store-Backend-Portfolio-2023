import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryDto from './dto/category.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import CreateCategoryDto from './dto/create-category.dto';
import IdDto from 'src/product/dto/id.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get('/')
    async findAll(): Promise<CategoryDto[]> {
        return this.categoryService.findAll();
    }

    @Post('/')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async create(@Body() category: CreateCategoryDto): Promise<CategoryDto> {
        return this.categoryService.create(category);
    }

    @Post('update/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async update(
        @Param() id: IdDto,
        @Body() category: CategoryDto,
    ): Promise<CategoryDto> {
        return this.categoryService.update(id, category);
    }

    @Post('delete/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async delete(@Param() id: IdDto): Promise<CategoryDto> {
        return this.categoryService.delete(id);
    }
}
