import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import UserDto from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async findOne(email: string): Promise<UserDto | undefined> {
        return await this.userModel.findOne({ email: email });
    }

    async create(user: UserDto): Promise<UserDto> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findAll(): Promise<UserDto[]> {
        return await this.userModel.find();
    }

    async delete(id: string): Promise<UserDto> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async update(id: string, user: UserDto): Promise<UserDto> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }
}
