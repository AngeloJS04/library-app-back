import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthCredentialDto } from 'src/dto/auth-credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(payload: AuthCredentialDto): Promise<UserEntity | null> {
        const { password, email } = payload

        const user = await this.authRepository.findOne({
            where: { email }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user
        }
        return null
    }

    async meService(user: UserEntity): Promise<Partial<UserEntity> | null> {
        try {
            const payload: Partial<UserEntity> = {

                email: user.email,
                username: user.username,
                id: user.id,
                createdAt: user.createdAt,
            };
            return payload;
        } catch (error) {
            return null;
        }
    };
    async signUp(payload: AuthCredentialDto): Promise<void> {
        const { username, password, email } = payload;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.authRepository.findOne({
            where: { username }
        })

        if (user) throw new BadRequestException('User already exists')

        const entity = this.authRepository.create({ username, email, password: hashedPassword });

        try {
            await this.authRepository.save(entity);
        } catch (error) {
            if (error?.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async signIn(payload: AuthCredentialDto): Promise<{ accessToken?: string, error?: { message: string } }> {
        const user = await this.validateUser(payload)

        if (!user) return {
            error: {
                message: "User not found or invalid credentials"
            }
        }
        const accessToken = this.generateJwt(user);

        return { accessToken }

    }

    async logout(response: Response): Promise<void | { message: string }> {
        try {
            response.cookie('access_token', '', {
                httpOnly: true,
                expires: new Date(0),
            });
            return { message: 'Logged out successfully' };
        } catch (error) {
            throw new UnauthorizedException('Failed to log out');
        }
    }

    private generateJwt(user: UserEntity): string {
        const payload = { username: user.username, email: user.email, id: user.id };
        return this.jwtService.sign(payload);
    }

}
