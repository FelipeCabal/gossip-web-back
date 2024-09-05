import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly UsersService: UsersService,
        private readonly JwtServices: JwtService
    ) { }

    async login({ email, password }: LoginDto) {
        const user = await this.UsersService.findByEmail(email)

        if ((await bcrypt.compare(password, user.password)) === false) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.nombre
        };
        return {
            access_token: await this.JwtServices.signAsync(payload),
        };
    }

    async register() {

    }

    async profile() {

    }
}
