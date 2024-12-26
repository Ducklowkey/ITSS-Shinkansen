"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_repository_1 = require("./post.repository");
let PostsService = class PostsService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async filter(filter) {
        return await this.postRepository.filter(filter);
    }
    async findById(id) {
        return await this.postRepository.findById(id);
    }
    async createComment(data) {
        const param = {
            userId: data.userId,
            userName: data.userName,
            description: data.description,
            postId: data.postId,
        };
        return await this.postRepository.createComment(param);
    }
    async getCommentByPostId(id) {
        return await this.postRepository.getCommentByPostId(id);
    }
    async createPost(data) {
        return await this.postRepository.createPost(data);
    }
    async getLikedPost(userId) {
        return await this.postRepository.getLikedPost(userId);
    }
    async createLike(data) {
        return this.postRepository.createLike(data);
    }
    async dislike(where) {
        return this.postRepository.deleteLike({
            userId_postId: where,
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repository_1.PostsRepository])
], PostsService);
//# sourceMappingURL=post.service.js.map