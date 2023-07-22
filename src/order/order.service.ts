import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import OrderDto from './dto/order.dto';
import CreateOrderDto from './dto/create-order.dto';
import { Order } from './order.schema';
import { Role } from 'src/roles/role.enum';

export interface UserOrders {
    orders: OrderDto[];
    count: number;
}

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

    async find(page: number): Promise<OrderDto[]> {
        const limit = 10;
        const skip = (page - 1) * limit;
        return await this.orderModel.find().limit(limit).skip(skip).exec();
    }

    async findUserOrders(userId: string, page: number): Promise<UserOrders> {
        const limit = 10;
        const skip = (page - 1) * limit;
        const orders = await this.orderModel
            .find({ userId: userId })
            .limit(limit)
            .skip(skip)
            .exec();
        const count = await this.orderModel.countDocuments({ userId: userId });
        return { orders: orders, count: count };
    }

    async findOne(id: string): Promise<OrderDto> {
        return await this.orderModel.findById(id).exec();
    }

    async create(
        order: CreateOrderDto,
        role: number,
        ip: string,
        id: string,
    ): Promise<CreateOrderDto> {
        order.id = await uuidv4();
        order.paymentIpAddress = ip;
        if (role == Role.Admin) {
            order.status = 'Approved';
            order.userId == null ? (order.userId = id) : order.userId;
        } else {
            order.status = 'Pending';
            order.userId = id;
        }
        return await this.orderModel.create(order);
    }

    async update(id: string, order: CreateOrderDto): Promise<OrderDto> {
        return await this.orderModel.findByIdAndUpdate(id, order, {
            new: true,
        });
    }

    async delete(id: string, role: number, userID: string): Promise<OrderDto> {
        if (role == Role.Admin) {
            return await this.orderModel.findByIdAndDelete(id);
        }
        const order = await this.orderModel.findById(id);
        if (order.userId == userID) {
            return await this.orderModel.findByIdAndDelete(id);
        } else {
            throw new UnauthorizedException();
        }
    }
}
