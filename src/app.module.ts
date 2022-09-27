import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configSchema from './config/config.schema';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: configSchema,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
