import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, // Hide error messages in production by changing to 'true'
      transform: false, // transform data types automatically. For example DateString to DateObject
      whitelist: true, // Only accept request properties defined in DTO
    }),
  );
  await app.listen(process.env.PORT || 3000);
  logger.log(`NEST SERVER LISTENING ON: ${process.env.PORT || 3000}`);
}
bootstrap();
