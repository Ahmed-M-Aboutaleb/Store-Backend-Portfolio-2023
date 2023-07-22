import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import SignupDto from 'src/auth/dto/signup.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async getAllUsers() {
        return await this.userService.findAll();
    }

    @Get('/profile')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User, Role.Seller)
    async getProfile(@Req() req: Request) {
        const id = req['user'].id;
        return await this.userService.getProfile(id);
    }

    @Post('/')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async createUser(@Body() user: SignupDto) {
        return await this.userService.create(user);
    }

    @Post('/delete')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User, Role.Seller)
    async deleteUser(@Req() req: Request) {
        const id = req['user'].id;
        const role = req['user'].role;
        return await this.userService.delete(id, role);
    }

    @Post('/update')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User, Role.Seller)
    async updateUser(@Req() req: Request, @Body() user: SignupDto) {
        const id = req['user'].id;
        const role = req['user'].role;
        return await this.userService.update(id, user, role);
    }
}
