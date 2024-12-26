import { Injectable } from '@nestjs/common';
import { PostsRepository } from './post.repository';
import { FilterPostDto } from './post-filter.dto';
import { CreateCommentDto } from './create-comment.dto';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './create-post.dto';
import { CreateLikeDto } from './create-like.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async filter(filter: FilterPostDto) {
    return await this.postRepository.filter(filter);
  }

  async findById(id: number) {
    return await this.postRepository.findById(id);
  }

  async createComment(data: CreateCommentDto){
    const param: Prisma.CommentUncheckedCreateInput = {
      userId: data.userId,
      userName: data.userName,
      description: data.description,
      postId: data.postId,
    }
    return await this.postRepository.createComment(param);
  }

  async getCommentByPostId(id: number){
    return await this.postRepository.getCommentByPostId(id);
  }
  async createPost(data: CreatePostDto){
    return await this.postRepository.createPost(data)
  }

  async getLikedPost(userId: number){
    return await this.postRepository.getLikedPost(userId)
  }

  async createLike(data: CreateLikeDto){
    return this.postRepository.createLike(data)
  }

  async dislike(where: { userId: number; postId: number }) {
    return this.postRepository.deleteLike({
      userId_postId: where, // Map the input to the compound unique key
    });
  }  
}
