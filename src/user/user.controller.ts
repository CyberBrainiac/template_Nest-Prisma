import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UserResponceDto } from './user.dto';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createUser(data);

    return plainToClass(UserResponceDto, user);
  }

  @Get()
  findAll() {
    return this.userService.users({ orderBy: { id: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.user({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id: +id });
  }
}
