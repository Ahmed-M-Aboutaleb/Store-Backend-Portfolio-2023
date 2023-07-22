import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import UserDto from './dto/user.dto';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async findOne(email: string): Promise<UserDto | undefined> {
        return await this.userModel.findOne({ email: email });
    }

    async findAll(): Promise<UserDto[]> {
        return await this.userModel.find();
    }

    async getProfile(id: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ id: id });
        user.password = undefined;
        return user;
    }

    async create(user: UserDto): Promise<UserDto> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async delete(id: string, role: number): Promise<UserDto> {
        if (role == Role.Admin) {
            return await this.userModel.findByIdAndRemove(id);
        }
        const user = await this.userModel.findById(id);
        if (user.id == id) {
            return await this.userModel.findByIdAndRemove(id);
        } else {
            throw new UnauthorizedException();
        }
    }

    async update(id: string, user: UserDto, role: number): Promise<UserDto> {
        if (role == Role.Admin) {
            return await this.userModel.findByIdAndUpdate(id, user, {
                new: true,
            });
        }
        const userDB = await this.userModel.findOne({ id: id });
        if (userDB.id == id) {
            return await this.userModel.findByIdAndUpdate(id, user, {
                new: true,
            });
        } else {
            throw new UnauthorizedException();
        }
    }
}
