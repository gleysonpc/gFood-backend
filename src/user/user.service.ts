import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async index(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    await user.save();
    return user;
  }

  async show(id: number) {
    const user = await User.findOne({ where: { id } });
    return user;
  }

  async update(createUserDto: CreateUserDto, id: number): Promise<User> {
    const user = await User.findOne(id);
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.save();
    return user;
  }
}
