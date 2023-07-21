import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, Token } from './auth.service';
import SignupDto from './dto/signup.dto';
import SigninDto from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('signin')
    async signin(@Body() signinDto: SigninDto): Promise<Token> {
        return await this.authService.sginIn(signinDto);
    }
    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<Token> {
        return await this.authService.sginUp(signupDto);
    }
}
