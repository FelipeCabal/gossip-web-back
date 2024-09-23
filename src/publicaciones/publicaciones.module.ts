import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicaciones } from './entities/publicaciones.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { publicacionesSchema, publicacionModelSchema } from './entities/publicaciones.schema';
import { comentarioModelSchema, comentariosSchema } from './entities/comentarios.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicaciones]),
    MongooseModule.forFeature([
      {
        name: publicacionesSchema.name,
        schema: publicacionModelSchema
      },
      {
        name: comentariosSchema.name,
        schema: comentarioModelSchema
      }
    ])
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
  exports: [TypeOrmModule, MongooseModule]
})
export class PublicacionesModule { }
