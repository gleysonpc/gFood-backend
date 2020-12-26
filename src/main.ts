import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  const options = new DocumentBuilder()
    .setTitle('gFood')
    .setDescription('Documentation for gFood API')
    .setVersion('1.5')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();
