import { forwardRef, Module } from '@nestjs/common';
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
import { GroupInvitationsService } from './services/group-invitations.service';
import { GroupChatsService } from './services/gruop-chats.service';
import { InvitationsGroupController } from './controllers/group-invitations.controller';
import { GroupChatsController } from './controllers/group-chats.controller';

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
  controllers: [PrivateChatsController, InvitationsGroupController, GroupChatsController],
  providers: [PrivateChatsService, GroupInvitationsService, GroupChatsService],
  exports: [TypeOrmModule, MongooseModule, PrivateChatsService]
})
export class ChatsModule { }
