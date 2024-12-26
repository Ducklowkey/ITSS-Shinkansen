import { FilterPostDto } from './post-filter.dto';
import { PostsService } from './post.service';
import { CreatePostDto } from './create-post.dto';
import { CreateCommentDto } from './create-comment.dto';
import { CreateLikeDto } from './create-like.dto';
export declare class PostController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(filter: FilterPostDto): Promise<{
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
    createComment(data: CreateCommentDto): Promise<{
        description: string;
        userId: number;
        postId: number;
        id: number;
        userName: string;
    }>;
    getCommentsByPostId(postId: number): Promise<{
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
    like(data: CreateLikeDto): Promise<{
        userId: number;
        postId: number;
    }>;
    dislike(data: CreateLikeDto): Promise<{
        userId: number;
        postId: number;
    }>;
}
