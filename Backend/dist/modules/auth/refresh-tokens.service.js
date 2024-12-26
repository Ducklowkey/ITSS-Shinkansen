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
exports.RefreshTokensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RefreshTokensService = class RefreshTokensService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const res = this.prisma.authRefreshToken.create({ data });
        return res;
    }
    async findByUserId(userId) {
        return this.prisma.authRefreshToken.findFirst({
            where: { userId },
        });
    }
    async updateByUserId(userId, data) {
        const refreshToken = await this.findByUserId(userId);
        return this.prisma.authRefreshToken.update({
            data,
            where: { id: refreshToken.id },
        });
    }
    async findByValue(refreshTokenValue) {
        return this.prisma.authRefreshToken.findFirst({
            where: { value: refreshTokenValue },
        });
    }
    async deleteByUserId(userId) {
        return this.prisma.authRefreshToken.deleteMany({
            where: { userId },
        });
    }
    async deleteById(id) {
        return this.prisma.authRefreshToken.delete({
            where: { id },
        });
    }
};
exports.RefreshTokensService = RefreshTokensService;
exports.RefreshTokensService = RefreshTokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefreshTokensService);
//# sourceMappingURL=refresh-tokens.service.js.map