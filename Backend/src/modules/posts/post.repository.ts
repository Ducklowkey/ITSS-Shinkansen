import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilterPostDto } from './post-filter.dto';
import { CreateLikeDto } from './create-like.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: Prisma.PostUncheckedCreateInput){
    return this.prisma.post.create({data})
  }
  async filter(filter: FilterPostDto) {
    const { categoryId, beginPrice, endPrice, flavor, search } = filter;

    // Build the filter object
    const where: any = {};

    // Filter by categoryId if provided
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Filter by multiple price ranges if beginPrice and endPrice are arrays
    if (Array.isArray(beginPrice) && Array.isArray(endPrice)) {
      where.OR = beginPrice
        .map((begin, index) => {
          const end = endPrice[index];
          if (begin !== undefined && end !== undefined) {
            return {
              price: {
                gte: begin,
                lte: end,
              },
            };
          }
          return null;
        })
        .filter(Boolean); // Remove null values
    }

    // Filter by flavor if provided
    if (flavor) {
      where.flavor = {
        contains: flavor,
        mode: 'insensitive', // Case-insensitive match
      };
    }

    // Add search filter for name or flavor
    if (search) {
      where.OR = [
        ...(where.OR || []), // Include previous OR conditions if any
        { name: { contains: search, mode: 'insensitive' } },
        { flavor: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Query the database
    const result = await this.prisma.post.findMany({
      where,
    });

    return result;
  }

  async findById(id: number) {
    const result = this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return result;
  }
  async createComment(data: Prisma.CommentUncheckedCreateInput){
    const result = await this.prisma.comment.create({data});
    return result;
  }

  async getCommentByPostId(postId: number){
    return await this.prisma.comment.findMany({
      where: {
        postId
      }
    });
  }

  async getLikedPost(userId: number){
    const likedPosts = this.prisma.like.findMany({
      where:{
       userId 
      }
    })
    const postIds = (await likedPosts).map((like) => like.postId)
    return await this.prisma.post.findMany(({
      where: {
        id: {in: postIds}
      }
    }))
  }

  async createLike(data: Prisma.LikeUncheckedCreateInput){
    return await this.prisma.like.create({data})
  }

  async deleteLike(where: Prisma.LikeWhereUniqueInput) {
    return this.prisma.like.delete({
      where,
    });
  }

}
