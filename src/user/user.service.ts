import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';
import { from, Observable, ObservedValueOf, of } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from './dto/put-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Observable<ObservedValueOf<User[]>> {
    return from(this.users);
  }

  findOne(id: string): Observable<User> {
    const found = this.users.find((user) => user.id === id);
    if (found) {
      return of(found);
    }
    throw new NotFoundException(`User with ${id} not found!`);
  }

  //TODO: refactor validation
  async createUser(dto: CreateUserDto): Promise<Observable<User>> {
    const { login, password } = dto;
    const user = this.users.find((user) => user.login === login);
    const currentDate = Date.now();
    const newUser: User = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.users = [...this.users, newUser];
    return of(newUser);
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Observable<ObservedValueOf<User[]>>> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID=${id} not found`);
    }
    this.users = this.users.map((user) => {
      if (id === user.id) {
        user.password = updatePasswordDto.newPassword;
        user.updatedAt = Date.now();
      }
      return user;
    });
    return from(user);
  }

  save(data: User): Observable<User> {
    //  const post = { ...data, id: this.posts.length + 1, createdAt: new Date() };
    this.users = [...this.users, data];
    return from(this.users);
  }

  // async saveUse(idx: string, data: any) {}
}
