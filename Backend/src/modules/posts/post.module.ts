import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostController } from './post.controller';
import { PostsRepository } from './post.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService, PostsRepository],
})
export class PostModule {}
