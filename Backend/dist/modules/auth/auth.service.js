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
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const refresh_tokens_service_1 = require("./refresh-tokens.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, prisma, refreshTokenService, configService) {
        this.usersService = usersService;
        this.prisma = prisma;
        this.refreshTokenService = refreshTokenService;
        this.configService = configService;
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await this.usersService.findByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid)
            return { id: user.id, name: user.name, email: user.email };
        return null;
    }
    async register(registerData) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(registerData.password, salt);
        const registerUser = {
            ...registerData,
            password: hashedPassword,
        };
        const user = await this.usersService.createUser(registerUser);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        refresh_tokens_service_1.RefreshTokensService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map