import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig, mongooseConfigUri } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { publicacionesSchema, publicacionModelSchema } from './publicaciones/entities/publicaciones.schema';
import { comentarioModelSchema, comentariosSchema } from './publicaciones/entities/comentarios.schema';
import { chatModelSchema, chatsSchema } from './chats/entities/chats.schema';
import { mensajeModelSchema, mensajesSchema } from './chats/entities/mensajes.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(mongooseConfigUri),
    MongooseModule.forFeature([
      {
        name: publicacionesSchema.name,
        schema: publicacionModelSchema
      },
      {
        name: comentariosSchema.name,
        schema: comentarioModelSchema
      },
      {
        name: chatsSchema.name,
        schema: chatModelSchema
      },
      {
        name: mensajesSchema.name,
        schema: mensajeModelSchema
      }
    ]),
    PublicacionesModule,
    ChatsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule { }
