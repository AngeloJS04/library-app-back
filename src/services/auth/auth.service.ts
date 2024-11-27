import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthCredentialDto } from 'src/dto/auth-credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(payload: AuthCredentialDto): Promise<UserEntity | null> {
        const { username, password, email } = payload

        const user = await this.authRepository.findOne({
            where: { username }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user
        }
        return null
    }

    async signIn(payload: AuthCredentialDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(payload)
        if (!user) throw new UnauthorizedException()

        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken }

    }

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


}
