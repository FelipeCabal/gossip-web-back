import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PublicacionesModule, ChatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
