import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatPrivado, Comunidades, Grupos } from './entities/chats.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { chatsSchema } from './entities/chats.schema';
import { mensajesSchema } from './entities/mensajes.schema';
import { chatModelSchema } from './entities/chats.schema';
import { mensajeModelSchema } from './entities/mensajes.schema';
import { InvitacionesGrupos } from './entities/invitaciones.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatPrivado, Grupos, Comunidades, InvitacionesGrupos]),
    MongooseModule.forFeature([
      {
        name: chatsSchema.name,
        schema: chatModelSchema
      },
      {
        name: mensajesSchema.name,
        schema: mensajeModelSchema
      }
    ])
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [TypeOrmModule, MongooseModule]
})
export class ChatsModule { }
