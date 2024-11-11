import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import UserController from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, CartService],
})
export class UserModule {}
