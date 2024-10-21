import { forwardRef, Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { comentarioModelSchema, comentariosSchema } from './entities/comentarios.schema';
import { PublicacionesModule } from '../publicaciones.module';
import { PublicacionesController } from '../publicaciones.controller';
import { PublicacionesService } from '../publicaciones.service';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';


@Module({
    imports: [MongooseModule.forFeature([
        {
            name: comentariosSchema.name,
            schema: comentarioModelSchema
        }
    ]),
        PublicacionesModule,
        UsersModule,
    ],
    controllers: [ComentariosController, PublicacionesController, UsersController],
    providers: [ComentariosService, PublicacionesService, UsersService],
    exports: [ComentariosService]
})
export class ComentariosModule { }
