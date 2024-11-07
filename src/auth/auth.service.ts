import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ArgonService } from 'argon2/argon.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from 'src/dto/client/user.dto';
import { UserDbDto } from 'src/dto/db/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly argon: ArgonService,
  ) {}
  async createUser(userData: UserDto): Promise<UserDbDto> {
    try {
      const email = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (email) {
        throw new ConflictException('Email is already in use');
      }

      userData.password = await this.argon.hashPassword(userData.password);

      const user = await this.prisma.user.create({ data: userData });

      return user;
    } catch (e) {
      throw e;
    }
  }
  async authorizeUser(userData: UserDto): Promise<UserDbDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (
        !user ||
        !(await this.argon.verifyPassword(user.password, userData.password))
      ) {
        throw new HttpException(
          'Incorrect email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
  // async findUserById(userId: number) {
  //   try {
  //     const user = this.prisma.user.findFirstOrThrow({ where: { id: userId } });
  //     return user;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async findUserByEmail(email: string) {
  //   try {
  //     const user = this.prisma.user.findUnique({ where: { email: email } });
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //     return user;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async findManyUsers() {
  //   try {
  //     const users = await this.prisma.user.findMany();
  //     return users;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
  // async updateUserData(userData: UserDto) {
  //   try {
  //     const user = await this.prisma.user.update({
  //       where: { email: userData.email },
  //       data: userData,
  //     });
  //     return user;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async deleteUser(userId: number) {
  //   try {
  //     const user = this.prisma.user.delete({ where: { id: userId } });
  //     return user;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
