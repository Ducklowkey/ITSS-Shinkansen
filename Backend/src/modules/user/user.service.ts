import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService{
    constructor(private readonly prisma: PrismaService) {}
    async findByEmail(email: string){
        return this.prisma.user.findFirst({
            where: {
                email,
            },
        })
    }
    

    async createUser(data: Prisma.UserUncheckedCreateInput){
        return this.prisma.user.create({data});
    }
}