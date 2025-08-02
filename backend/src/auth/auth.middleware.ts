import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayloadWithEmail {
  email: string;
  role?: string;
  [key: string]: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1];
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) throw new Error('JWT_SECRET is not configured');

    try {
      const decoded = jwt.verify(token, jwtSecret);

      if (typeof decoded === 'string') {
        throw new UnauthorizedException('Invalid token structure');
      }

      req['user'] = decoded as JwtPayloadWithEmail;
      next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
