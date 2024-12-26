import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
