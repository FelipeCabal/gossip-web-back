import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatPrivado, Comunidades, Grupos } from './entities/chats.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { mensajesSchema } from './entities/mensajes.schema';
import { mensajeModelSchema } from './entities/mensajes.schema';
import { InvitacionesGrupos } from './entities/invitaciones.entity';
import { PrivateChatsService } from './services/private-chats.service';
import { UsersModule } from 'src/users/users.module';
import { PrivateChatsController } from './controllers/private-chats.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatPrivado, Grupos, Comunidades, InvitacionesGrupos]),
    MongooseModule.forFeature([
      {
        name: mensajesSchema.name,
        schema: mensajeModelSchema
      }
    ]),
    forwardRef(() => UsersModule),
    RouterModule.register([
      {
        path: 'chats',
        module: ChatsModule
      },
    ]),
  ],
  controllers: [ChatsController, PrivateChatsController],
  providers: [ChatsService, PrivateChatsService],
  exports: [TypeOrmModule, MongooseModule, PrivateChatsService]
})
export class ChatsModule { }
