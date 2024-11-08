import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategortyDto } from 'src/dto/client/category.dto';
import { CategoryDbDto } from 'src/dto/db/category.dto';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить массив категории',
    description: 'Позволяет получить массив всех категорий',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Успешно получен массив категорий',
    type: CategoryDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async getAllCategories() {
    const categories = await this.CategoryService.getAllCategories();
    return {
      message: 'Успешно получен массив категорий',
      categories,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Создать категорию',
    description: 'Позволяет создать категорию',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Категория успешно создалась',
    type: CategoryDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async createCategory(@Body() category: CategortyDto) {
    const createCategory = await this.CategoryService.createCategory(category);
    return {
      message: 'Категория успешно создалась',
      createCategory,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Обновить категорию',
    description: 'Полное обновление категории',
  })
  @ApiParam({
    name: 'categoryId',
    description: 'ID категории',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Категория успешно обновилась',
    type: CategoryDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async updateCategoryPut(
    @Param('id', new ParseIntPipe()) categoryId: number,
    @Body() category: CategortyDto,
  ) {
    const updatedCategory = await this.CategoryService.updateCategory(
      categoryId,
      category,
    );
    return {
      message: 'Категория успешно обновилась',
      updatedCategory,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Частично обновить категорию',
    description: 'Позволяет частично обновить категорию',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Категория успешно обновилась',
    type: CategoryDbDto,
  })
  @ApiResponse({
    status: '5XX',
    description: 'Ошибка сервера',
  })
  async updateCategoryPatch(
    @Param('id', new ParseIntPipe()) categoryId: number,
    @Body() category: CategortyDto,
  ) {
    const updatedCategory = await this.CategoryService.updateCategory(
      categoryId,
      category,
    );
    return {
      message: 'Категория успешно обновилась',
      updatedCategory,
    };
  }
}
