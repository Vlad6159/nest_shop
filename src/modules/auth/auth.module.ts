import { Module } from '@nestjs/common';
import { ArgonService } from 'argon2/argon.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ArgonService],
})
export class AuthModule {}