import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthCredentialDto } from 'src/dto/auth-credentials';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signUp(@Body() AuthCredentialsDto: AuthCredentialDto) {
        return this.authService.signUp(AuthCredentialsDto);
    }


    @ApiResponse({
        description: 'SignIn',
        type: AuthCredentialDto,
        status: 201,
    })
    @Post('/login')
    async login(@Req() @Body() payload: AuthCredentialDto) {

        return this.authService.signIn(payload)
    }
}
