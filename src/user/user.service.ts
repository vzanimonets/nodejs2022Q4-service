import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';
import { from, Observable, ObservedValueOf, of } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';

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
  async createUser(dto: CreateUserDto): Promise<void> {
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
    await this.addUser(newUser);
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
