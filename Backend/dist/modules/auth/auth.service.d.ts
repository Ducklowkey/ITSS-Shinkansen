import { ConfigService } from '@nestjs/config';
import { LoginDto } from "./login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user/user.service";
import { RefreshTokensService } from "./refresh-tokens.service";
import { RegisterDto } from './register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly prisma;
    private readonly refreshTokenService;
    private readonly configService;
    constructor(usersService: UserService, prisma: PrismaService, refreshTokenService: RefreshTokensService, configService: ConfigService);
    login(loginData: LoginDto): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    register(registerData: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
}
