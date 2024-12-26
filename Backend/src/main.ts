import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ITSS')
    .setDescription('The itss project API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các trường không nằm trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có trường không nằm trong DTO
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173', // Địa chỉ frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
    credentials: true, // Cho phép cookie nếu cần
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
