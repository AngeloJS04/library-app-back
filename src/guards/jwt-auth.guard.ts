import { Injectable } from '@nestjs/common';
import { Request } from 'express'
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.cookies['auth'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret:  process.env.JWT_SECRET
      });
      request.user = decoded;

      return true;
    } catch (error) {
      console.log({ error })
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
