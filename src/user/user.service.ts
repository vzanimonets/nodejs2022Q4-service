import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.interface';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from './dto/put-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const found = this.users.find((user) => user.id === id);
    if (found) {
      return found;
    }
    throw new NotFoundException(`User with ${id} not found!`);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const currentDate = Date.now();
    const newUser: User = {
      id: uuid(),
      ...dto,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.users.push(newUser);
    return newUser;
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async updateUser(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('user not unauthorized');
    }

    user.password = dto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return user;
  }

  save(data: User): Observable<User> {
    this.users = [...this.users, data];
    return from(this.users);
  }

  async deleteUser(id: string) {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    this.users.splice(idx, 1);
  }
}
