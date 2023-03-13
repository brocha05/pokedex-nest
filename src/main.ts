import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')//Agrega el prefijo a los paths de la API Rest cuando se quiera hacer fetch.
  await app.listen(3000);
}
bootstrap();
