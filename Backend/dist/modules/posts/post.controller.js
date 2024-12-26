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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const swagger_1 = require("@nestjs/swagger");
const post_filter_dto_1 = require("./post-filter.dto");
const post_service_1 = require("./post.service");
const common_1 = require("@nestjs/common");
const create_post_dto_1 = require("./create-post.dto");
const create_comment_dto_1 = require("./create-comment.dto");
const create_like_dto_1 = require("./create-like.dto");
let PostController = class PostController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    findAll(filter) {
        return this.postsService.filter(filter);
    }
    findById(id) {
        return this.postsService.findById(id);
    }
    createPost(data) {
        return this.postsService.createPost(data);
    }
    createComment(data) {
        return this.postsService.createComment(data);
    }
    getCommentsByPostId(postId) {
        return this.postsService.getCommentByPostId(postId);
    }
    getLikedPost(userId) {
        return this.postsService.getLikedPost(userId);
    }
    like(data) {
        return this.postsService.createLike(data);
    }
    dislike(data) {
        return this.postsService.dislike(data);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_filter_dto_1.FilterPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('comment/:postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getCommentsByPostId", null);
__decorate([
    (0, common_1.Get)('liked/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getLikedPost", null);
__decorate([
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "like", null);
__decorate([
    (0, common_1.Delete)('like'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "dislike", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, swagger_1.ApiTags)('Post'),
    __metadata("design:paramtypes", [post_service_1.PostsService])
], PostController);
//# sourceMappingURL=post.controller.js.map