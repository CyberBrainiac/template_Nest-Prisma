import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cat, Prisma } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async cat(
    catWhereUniqueInput: Prisma.CatWhereUniqueInput,
  ): Promise<Cat | null> {
    return this.prisma.cat.findUnique({
      where: catWhereUniqueInput,
    });
  }

  async cats(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CatWhereUniqueInput;
    where?: Prisma.CatWhereInput;
    orderBy?: Prisma.CatOrderByWithRelationInput;
  }): Promise<Cat[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cat.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCat(data: Prisma.CatCreateInput): Promise<Cat> {
    return this.prisma.cat.create({
      data,
    });
  }

  async updateCat(params: {
    where: Prisma.CatWhereUniqueInput;
    data: Prisma.CatUpdateInput;
  }): Promise<Cat> {
    const { data, where } = params;
    return this.prisma.cat.update({
      data,
      where,
    });
  }

  async deleteCat(where: Prisma.CatWhereUniqueInput): Promise<Cat> {
    return this.prisma.cat.delete({
      where,
    });
  }
}
