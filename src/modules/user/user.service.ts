import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserData(userId: number) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
