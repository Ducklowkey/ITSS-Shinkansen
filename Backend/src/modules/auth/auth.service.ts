import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user/user.service";
import { RefreshTokensService } from "./refresh-tokens.service";
import { RegisterDto } from './register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    constructor( 
        private readonly usersService: UserService,
         private readonly prisma: PrismaService,
         private readonly refreshTokenService: RefreshTokensService,
         private readonly configService: ConfigService

        ){}
        public async login(loginData: LoginDto) {
          const { email, password } = loginData;
          const user = await this.usersService.findByEmail(email);
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if(isPasswordValid)
            return {id: user.id,name: user.name,email: user.email};
          return null;
        }
    public async register(registerData: RegisterDto){
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(registerData.password, salt);
      const registerUser: any = {
        ...registerData,
        password: hashedPassword,
      }
      const user = await this.usersService.createUser(registerUser)
      return user;
    }
    
}