import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from 'src/users/users.module';
import { PublicacionesModule } from 'src/publicaciones/publicaciones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { PublicacionesService } from 'src/publicaciones/publicaciones.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    UsersModule,
    PublicacionesModule
  ],
  controllers: [LikesController],
  providers: [LikesService, PublicacionesService, UsersService],
})
export class LikesModule { }
