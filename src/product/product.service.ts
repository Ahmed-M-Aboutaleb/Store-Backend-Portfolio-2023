import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import ProductDto from './dto/product.dto';
import CreateProductDto from './dto/create-product.dto';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async find(page: number): Promise<ProductDto[]> {
        const limit = 10;
        const skip = (page - 1) * limit;
        return await this.productModel
            .find({ approved: true })
            .limit(limit)
            .skip(skip)
            .exec();
    }

    async findOne(id: string): Promise<ProductDto> {
        return await this.productModel.findById(id).exec();
    }

    async create(product: CreateProductDto): Promise<ProductDto> {
        product.id = await uuidv4();
        product.numReviews = 0;
        product.rating = 0;
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async update(
        id: string,
        role: number,
        seller: string,
        product: ProductDto,
    ): Promise<ProductDto> {
        if (role == Role.Admin) {
            return await this.productModel.findByIdAndUpdate(id, product, {
                new: true,
            });
        } else {
            this.findOne(id).then(async (oldProduct) => {
                if (oldProduct.seller == seller) {
                    return await this.productModel.findByIdAndUpdate(
                        id,
                        product,
                        {
                            new: true,
                        },
                    );
                } else {
                    throw new UnauthorizedException();
                }
            });
        }
    }

    async delete(
        id: string,
        role: number,
        seller: string,
    ): Promise<ProductDto> {
        if (role == Role.Admin) {
            return await this.productModel.findByIdAndDelete(id).exec();
        } else {
            this.findOne(id).then(async (product) => {
                if (product.seller == seller) {
                    return await this.productModel.findByIdAndDelete(id).exec();
                } else {
                    throw new UnauthorizedException();
                }
            });
        }
    }
}
