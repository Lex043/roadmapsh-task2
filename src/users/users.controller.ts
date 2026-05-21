import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() data: CreateUserDto) {
        return this.usersService.registerUser(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile() {
        console.log('hiiii');
    }
}
