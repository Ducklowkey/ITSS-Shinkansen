import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    createUser(data: Prisma.UserUncheckedCreateInput): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
}
