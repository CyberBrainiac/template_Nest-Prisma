import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { CatsModule } from '@app/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
