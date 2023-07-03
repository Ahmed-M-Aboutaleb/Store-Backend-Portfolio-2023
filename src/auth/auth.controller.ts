import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService, Token } from './auth.service';
import SignupDto from './dto/signup.dto';
import SigninDto from './dto/signin.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('signin')
    async signin(@Body() signinDto: SigninDto): Promise<Token> {
        return this.authService.sginIn(signinDto);
    }
    @Post('test')
    @UseGuards(RolesGuard)
    @Roles(Role.User, Role.Admin)
    async test(): Promise<string> {
        return 'test';
    }
    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<Token> {
        return this.authService.sginUp(signupDto);
    }
}
