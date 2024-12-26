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
exports.PostsRepository = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let PostsRepository = class PostsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPost(data) {
        return this.prisma.post.create({ data });
    }
    async filter(filter) {
        const { categoryId, beginPrice, endPrice, flavor, search } = filter;
        const where = {};
        if (categoryId) {
            where.categoryId = categoryId;
        }
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
                .filter(Boolean);
        }
        if (flavor) {
            where.flavor = {
                contains: flavor,
                mode: 'insensitive',
            };
        }
        if (search) {
            where.OR = [
                ...(where.OR || []),
                { name: { contains: search, mode: 'insensitive' } },
                { flavor: { contains: search, mode: 'insensitive' } },
            ];
        }
        const result = await this.prisma.post.findMany({
            where,
        });
        return result;
    }
    async findById(id) {
        const result = this.prisma.post.findUnique({
            where: {
                id,
            },
        });
        return result;
    }
    async createComment(data) {
        const result = await this.prisma.comment.create({ data });
        return result;
    }
    async getCommentByPostId(postId) {
        return await this.prisma.comment.findMany({
            where: {
                postId
            }
        });
    }
    async getLikedPost(userId) {
        const likedPosts = this.prisma.like.findMany({
            where: {
                userId
            }
        });
        const postIds = (await likedPosts).map((like) => like.postId);
        return await this.prisma.post.findMany(({
            where: {
                id: { in: postIds }
            }
        }));
    }
    async createLike(data) {
        return await this.prisma.like.create({ data });
    }
    async deleteLike(where) {
        return this.prisma.like.delete({
            where,
        });
    }
};
exports.PostsRepository = PostsRepository;
exports.PostsRepository = PostsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsRepository);
//# sourceMappingURL=post.repository.js.map