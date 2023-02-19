import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/put-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllPosts() {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) uuid: string) {
    return this.userService.findOne(uuid);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updateUser(id, updatePasswordDto);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
