import { Generated, Insertable, Selectable, Updateable } from 'kysely';
export interface Database {
    post: PostTable;
    category: CategoryTable;
    comment: CommentTable;
    user: UserTable;
}
export interface PostTable {
    id: Generated<number>;
    name: string;
    price: number;
    voteRate: number;
    flavor: string;
    materials: string;
    making: string;
    image: string;
    categoryId: number;
}
export type Post = Selectable<PostTable>;
export type NewPost = Insertable<PostTable>;
export type PostUpdate = Updateable<PostTable>;
export interface CategoryTable {
    id: Generated<number>;
    name: string;
}
export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;
export interface CommentTable {
    id: Generated<number>;
    userId: number;
    userName: number;
    postId: number;
    description: string;
}
export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;
export interface UserTable {
    id: Generated<number>;
    name: string;
    email: string;
    password: string;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
export interface LikeTable {
    userId: number;
    postId: number;
}
export type Like = Selectable<LikeTable>;
export type NewLike = Insertable<LikeTable>;
export type LikeUpdate = Updateable<LikeTable>;
export interface AuthRefreshTokenTable {
    id: Generated<number>;
    value: string;
    userId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type AuthRefreshToken = Selectable<AuthRefreshTokenTable>;
export type NewAuthRefreshToken = Insertable<AuthRefreshTokenTable>;
export type AuthRefreshTokenUpdate = Updateable<AuthRefreshTokenTable>;
