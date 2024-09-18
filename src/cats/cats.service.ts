import { PrismaService } from '@app/prisma/prisma.service';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cat, Prisma } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  sayMeu(): string {
    // return 'MEY! MEU!';
    throw new InternalServerErrorException();
  }

  async cat(catWhereUniqueInput: Prisma.CatWhereUniqueInput): Promise<Cat | null> {
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

  async createCat(data: Prisma.CatCreateInput, userId: number): Promise<Cat> {
    const searchCat = await this.cats({
      where: { name: data.name, age: data.age, userId: userId },
    });
    const catAlreadyAdded = !!searchCat.length;

    if (catAlreadyAdded) {
      throw new ConflictException(
        `cat already added. Name: ${data.name}, age: ${data.age}, userId: ${userId}`,
      );
    }

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
