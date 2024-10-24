import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatPrivado, Comunidades, Grupos } from './entities/chats.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { mensajesSchema } from './entities/mensajes.schema';
import { mensajeModelSchema } from './entities/mensajes.schema';
import { InvitacionesGrupos } from './entities/invitaciones.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatPrivado, Grupos, Comunidades, InvitacionesGrupos]),
    MongooseModule.forFeature([
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
