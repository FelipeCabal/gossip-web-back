import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
    constructor(private configService: ConfigService) { }

    get jwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET') || 'secret';
    }
}