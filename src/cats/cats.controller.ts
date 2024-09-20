import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AuthGuard } from '@app/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    // For test purpose
    const defaultUser = {
      email: 'default@gmail.com',
      name: 'defaultName',
      password: 'defaultPassword',
      phone: 'defaultPhone',
    };

    return this.catsService.createCat(
      {
        age: createCatDto.age,
        breed: createCatDto.breed,
        name: createCatDto.name,
        user: {
          connectOrCreate: {
            where: { id: createCatDto.userId },
            create: defaultUser,
          },
        },
      },
      +createCatDto.userId,
    );
  }

  @Get('/meu')
  sayMeu() {
    return this.catsService.sayMeu();
  }

  @Get()
  findAll() {
    return this.catsService.cats({ orderBy: { id: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.cat({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCatDto) {
    return this.catsService.updateCat({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.deleteCat({ id: +id });
  }
}
