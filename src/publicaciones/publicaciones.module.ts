import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicaciones } from './entities/publicaciones.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { comentarioModelSchema, comentariosSchema } from './comentarios/entities/comentarios.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Publicaciones]),
    MongooseModule.forFeature([
      {
        name: comentariosSchema.name,
        schema: comentarioModelSchema
      }
    ]),
    UsersModule,
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService, UsersService],
  exports: [TypeOrmModule, MongooseModule, UsersModule, PublicacionesService]
})
export class PublicacionesModule { }
