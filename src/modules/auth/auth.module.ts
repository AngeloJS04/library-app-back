import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
