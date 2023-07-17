import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import ProductDto from './dto/product.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import CreateProductDto from './dto/create-product.dto';
import PageDto from './dto/page.dto';
import IdDto from './dto/id.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    @Get(':page')
    async findByPage(@Param() params: PageDto) {
        return this.productService.find(params.page);
    }
    @Post('/')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Seller)
    async create(
        @Body() productDto: CreateProductDto,
        @Req() request: Request,
    ): Promise<ProductDto> {
        productDto.seller = request['user'].id;
        if (request['user'].role === Role.Admin) {
            productDto.approved = true;
        } else {
            productDto.approved = false;
        }
        return this.productService.create(productDto);
    }

    @Get('update/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Seller)
    async update(
        @Param() params: IdDto,
        @Req() request: Request,
        @Body() product: ProductDto,
    ): Promise<ProductDto> {
        const seller = request['user'].id;
        const role = request['user'].role;
        return this.productService.update(params.id, role, seller, product);
    }

    @Get('delete/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Seller)
    async delete(
        @Param() params: IdDto,
        @Req() request: Request,
    ): Promise<ProductDto> {
        const seller = request['user'].id;
        const role = request['user'].role;
        return this.productService.delete(params.id, role, seller);
    }
}
