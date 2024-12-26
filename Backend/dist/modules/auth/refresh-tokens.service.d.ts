import { PrismaService } from 'src/prisma/prisma.service';
export declare class RefreshTokensService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: number;
        value: string;
    }): Promise<any>;
    findByUserId(userId: number): Promise<any>;
    updateByUserId(userId: number, data: {
        value: string;
    }): Promise<any>;
    findByValue(refreshTokenValue: string): Promise<any>;
    deleteByUserId(userId: number): Promise<any>;
    deleteById(id: number): Promise<any>;
}
