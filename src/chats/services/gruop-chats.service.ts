import { Injectable } from '@nestjs/common';
import { createGrupoDto } from '../dto/GruposDto/create-grupos.dto';
import { updateGruposDto } from '../dto/GruposDto/update-grupos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupos } from '../entities/chats.entity';


@Injectable()
export class GroupChatsService {
    constructor(
        @InjectRepository(Grupos)
        private readonly groupRepository: Repository<Grupos>
    ) { }
    create(createChatDto: createGrupoDto) {
        return 'This action adds a new chat';
    }

    findAll() {
        return `This action returns all chats`;
    }

    findOne(id: number) {
        return `This action returns a #${id} chat`;
    }

    update(id: number, updateChatDto: updateGruposDto) {
        return `This action updates a #${id} chat`;
    }

    remove(id: number) {
        return `This action removes a #${id} chat`;
    }
}
