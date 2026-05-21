import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/entities/user.entity';
import { RefreshAuthGuard } from './guards/refresh-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('users/login')
    async login(@Request() req: { user: User }) {
        return this.authService.login(req.user);
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refreshToken(@Request() req: { user: User }) {
        return this.authService.refreshToken(req.user);
    }
}
