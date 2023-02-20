import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/put-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const found = await this.userRepository.findOneBy({ id });
    if (found) {
      return found.toResponse();
    }
    throw new NotFoundException(`User with ${id} not found!`);
  }

  async create(dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser.toResponse();
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('user not unauthorized');
    }

    user.password = dto.newPassword;
    // user.updatedAt = Date.now();
    // user.version++;
    const savedUser = await this.userRepository.save(user);
    return savedUser.toResponse();
  }

  async deleteUser(id: string) {
    const found = await this.userRepository.findOneBy({ id });
    if (found) {
      await this.userRepository.delete(id);
      return;
    }

    throw new NotFoundException(`User with ${id} not found!`);
  }
}
