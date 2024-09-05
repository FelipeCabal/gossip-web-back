import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatPrivado, Comunidades, Grupos } from './entities/chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatPrivado, Grupos, Comunidades])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [TypeOrmModule]
})
export class ChatsModule { }
