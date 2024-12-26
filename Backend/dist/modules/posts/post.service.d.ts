import { PostsRepository } from './post.repository';
import { FilterPostDto } from './post-filter.dto';
import { CreateCommentDto } from './create-comment.dto';
import { CreatePostDto } from './create-post.dto';
import { CreateLikeDto } from './create-like.dto';
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: PostsRepository);
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
    createComment(data: CreateCommentDto): Promise<{
        description: string;
        userId: number;
        postId: number;
        id: number;
        userName: string;
    }>;
    getCommentByPostId(id: number): Promise<{
        description: string;
        userId: number;
        postId: number;
        id: number;
        userName: string;
    }[]>;
    createPost(data: CreatePostDto): Promise<{
        categoryId: number;
        id: number;
        name: string;
        price: number | null;
        voteRate: number | null;
        materials: string;
        making: string | null;
        image: string | null;
    }>;
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
    createLike(data: CreateLikeDto): Promise<{
        userId: number;
        postId: number;
    }>;
    dislike(where: {
        userId: number;
        postId: number;
    }): Promise<{
        userId: number;
        postId: number;
    }>;
}
