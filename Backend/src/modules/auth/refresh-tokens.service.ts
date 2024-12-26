import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RefreshTokensService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: { userId: number; value: string}) {
    const res = this.prisma.authRefreshToken.create({ data });
    return res;
  }

  async findByUserId(userId: number) {
    return this.prisma.authRefreshToken.findFirst({
      where: { userId },
    });
  }

  async updateByUserId(userId: number, data: { value: string }) {
    const refreshToken = await this.findByUserId(userId);
    return this.prisma.authRefreshToken.update({
      data,
      where: { id: refreshToken.id },
    });
  }

  async findByValue(refreshTokenValue: string) {
    return this.prisma.authRefreshToken.findFirst({
      where: { value: refreshTokenValue },
    });
  }

  async deleteByUserId(userId: number) {
    return this.prisma.authRefreshToken.deleteMany({
      where: { userId },
    });
  }

  async deleteById(id: number) {
    return this.prisma.authRefreshToken.delete({
      where: { id },
    });
  }
}
