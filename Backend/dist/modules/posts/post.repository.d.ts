import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FilterPostDto } from './post-filter.dto';
export declare class PostsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPost(data: Prisma.PostUncheckedCreateInput): Promise<{
        categoryId: number;
        id: number;
        name: string;
        price: number | null;
        voteRate: number | null;
        materials: string;
        making: string | null;
        image: string | null;
    }>;
    filter(filter: FilterPostDto): Promise<{
        categoryId: number;
        id: number;
        name: string;
        price: number | null;
        voteRate: number | null;
        materials: string;
        making: string | null;
        image: string | null;
    }[]>;
    findById(id: number): Promise<{
        categoryId: number;
        id: number;
        name: string;
        price: number | null;
        voteRate: number | null;
        materials: string;
        making: string | null;
        image: string | null;
    }>;
    createComment(data: Prisma.CommentUncheckedCreateInput): Promise<{
        description: string;
        userId: number;
        postId: number;
        id: number;
        userName: string;
    }>;
    getCommentByPostId(postId: number): Promise<{
        description: string;
        userId: number;
        postId: number;
        id: number;
        userName: string;
    }[]>;
    getLikedPost(userId: number): Promise<{
        categoryId: number;
        id: number;
        name: string;
        price: number | null;
        voteRate: number | null;
        materials: string;
        making: string | null;
        image: string | null;
    }[]>;
    createLike(data: Prisma.LikeUncheckedCreateInput): Promise<{
        userId: number;
        postId: number;
    }>;
    deleteLike(where: Prisma.LikeWhereUniqueInput): Promise<{
        userId: number;
        postId: number;
    }>;
}
