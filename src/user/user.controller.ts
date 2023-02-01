import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { Observable, take, toArray } from 'rxjs';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAllPosts(@Query('q') keyword?: string): Observable<User[]> {
    return this.userService.findAll().pipe(take(10), toArray());
  }
  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.findOne(uuid);
  }
}
