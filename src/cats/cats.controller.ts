import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    const basicEmail = 'basic@gmail.com';
    const basicName = 'basicName';

    return this.catsService.createCat(
      {
        age: +createCatDto.age,
        breed: createCatDto.breed,
        name: createCatDto.name,
        owner: {
          connectOrCreate: {
            where: { id: +createCatDto.ownerId },
            create: { email: basicEmail, name: basicName },
          },
        },
      },
      +createCatDto.ownerId,
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
