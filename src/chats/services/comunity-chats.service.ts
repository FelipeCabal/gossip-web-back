import { Injectable } from '@nestjs/common';
import { createComunidadDto } from '../dto/comunidadesDto/create-comunidad.dto';
import { updateComunidadesDto } from '../dto/comunidadesDto/update-comunidades.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comunidades } from '../entities/chats.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ComunityChatsService {
    constructor(
        @InjectRepository(Comunidades)
        private readonly comunityRepository: Repository<Comunidades>
    ) { }
    create(createChatDto: createComunidadDto) {
        return 'This action adds a new chat';
    }

    findAll() {
        return `This action returns all chats`;
    }

    findOne(id: number) {
        return `This action returns a #${id} chat`;
    }

    update(id: number, updateChatDto: updateComunidadesDto) {
        return `This action updates a #${id} chat`;
    }

    remove(id: number) {
        return `This action removes a #${id} chat`;
    }
}
