import { Module } from '@nestjs/common';
import { IdGenerator } from './id.generator';

@Module({
  providers: [IdGenerator],
  exports: [IdGenerator],
})
export class UtilsModule {}
