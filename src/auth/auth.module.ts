import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/config/constants/jwt.constants';
import { UsersService } from 'src/users/services/users.service';


@Module({
  imports: [JwtModule.register(jwtConstants), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule { }
