import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [CatsModule, ConfigModule.forRoot({ isGlobal: true }), OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
