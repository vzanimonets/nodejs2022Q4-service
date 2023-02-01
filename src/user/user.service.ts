import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { EMPTY, from, Observable, ObservedValueOf, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: uuid(), // uuid v4
      login: 'd',
      password: '',
      version: 1, // integer number, increments on update
      createdAt: new Date().getMilliseconds(), // timestamp of creation
      updatedAt: new Date().getMilliseconds(), // timestamp of last upda
    },
  ];

  findAll(): Observable<ObservedValueOf<User[]>> {
    return from(this.users);
  }

  findOne(id: string): Observable<User> {
    const found = this.users.find((user) => user.id === id);
    if (found) {
      return of(found);
    }
    return EMPTY;
  }
}
