import {
    Controller,
    Get,
    Param,
    Body,
    Post,
    UseGuards,
    Req,
    Ip,
} from '@nestjs/common';
import { OrderService, UserOrders } from './order.service';
import PageDto from 'src/product/dto/page.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import OrderDto from './dto/order.dto';
import CreateOrderDto from './dto/create-order.dto';
import IdDto from 'src/product/dto/id.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('/:page')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async findByPage(@Param() params: PageDto): Promise<OrderDto[]> {
        return await this.orderService.find(params.page);
    }

    @Get('/my/:page')
    @UseGuards(RolesGuard)
    @Roles(Role.User, Role.Admin, Role.Seller)
    async findUserOrders(
        @Param() params: PageDto,
        @Req() request: Request,
    ): Promise<UserOrders> {
        const userID = request['user'].id;
        return await this.orderService.findUserOrders(userID, params.page);
    }

    @Post('/')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Seller, Role.User)
    async create(
        @Body() order: CreateOrderDto,
        @Req() request: Request,
        @Ip() ip: string,
    ): Promise<OrderDto> {
        const role = request['user'].role;
        const id = request['user'].id;
        return await this.orderService.create(order, role, ip, id);
    }

    @Post('/update/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async update(@Body() order: CreateOrderDto, @Param() params: IdDto) {
        return await this.orderService.update(params.id, order);
    }

    @Post('/delete/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Seller, Role.User)
    async delete(@Param() params: IdDto, @Req() request: Request) {
        const role = request['user'].role;
        const userID = request['user'].id;
        return await this.orderService.delete(params.id, role, userID);
    }
}
