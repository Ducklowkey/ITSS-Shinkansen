import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/posts/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // Thêm import này
import { join } from 'path'; // Thêm import này

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Đảm bảo thư mục uploads đúng vị trí
      serveRoot: '/uploads', // Cấu hình URL /uploads để phục vụ các tệp trong thư mục uploads
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
