import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicaciones } from './entities/publicaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicaciones])],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
  exports: [TypeOrmModule]
})
export class PublicacionesModule { }
