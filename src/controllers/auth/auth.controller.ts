import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthCredentialDto } from 'src/dto/auth-credentials';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @ApiResponse({
        description: 'SignUp',
        type: AuthCredentialDto,
        status: 201,
    })
    @Post('/signup')
    signUp(@Body() AuthCredentialsDto: AuthCredentialDto) {
        return this.authService.signUp(AuthCredentialsDto);
    }


    @Post('/login')
    async login(@Res() res: Response, @Req() @Body() payload: AuthCredentialDto) {
        const token = await this.authService.signIn(payload)
        if (token.error) return res.status(400).json(token)

        res.cookie('auth', token.accessToken, {
            domain: '.localhost',
            path: '/'
        })

        return res.json({
            logged: true
        })

    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async meUser(@Req() req: any) {
        const user = req.user;
        return this.authService.meService(user);
    }

}
