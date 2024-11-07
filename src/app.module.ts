import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProductModule],
})
export class AppModule {}
