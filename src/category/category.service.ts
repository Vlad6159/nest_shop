import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CategortyDto } from 'src/dto/client/category.dto';
import { CategoryDbDto } from 'src/dto/db/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(): Promise<CategoryDbDto[]> {
    try {
      const categories = await this.prisma.category.findMany();
      if (categories.length === 0) {
        throw new NotFoundException('Категорий нет');
      }
      return categories;
    } catch (e) {
      throw e;
    }
  }

  async createCategory(category: CategortyDto) {
    try {
      return await this.prisma.category.create({ data: category });
    } catch (e) {
      throw e;
    }
  }

  async updateCategory(categoryId: number, category: CategortyDto) {
    try {
      return await this.prisma.category.update({
        where: { id: categoryId },
        data: category,
      });
    } catch (e) {
      throw e;
    }
  }
}
