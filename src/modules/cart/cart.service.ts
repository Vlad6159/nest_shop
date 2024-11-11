import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartDto } from 'src/common/dto/client/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async findUserCart(userId: number): Promise<CartDto[]> {
    try {
      const cart = await this.prisma.cart.findMany({
        where: { userId: userId },
        include: { product: true },
      });
      if (cart.length === 0) {
        throw new NotFoundException('Корзина пользователя пуста');
      }
      return cart;
    } catch (e) {
      throw e;
    }
  }

  async addProductToCart(userId, productId, quantity): Promise<void> {
    try {
      const productInCart = this.prisma.cart.findFirst({
        where: { userId: userId, productId: productId },
      });
      if (!productInCart) {
        throw new ConflictException('Товар уже в корзине');
      }
      await this.prisma.cart.create({
        data: { userId: userId, productId: productId, quantity: quantity },
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteCart(userId): Promise<void> {
    try {
      await this.findUserCart(userId);
      await this.prisma.cart.deleteMany({ where: { userId: userId } });
    } catch (e) {
      throw e;
    }
  }
}
