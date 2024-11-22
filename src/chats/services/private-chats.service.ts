import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatPrivado } from '../entities/chats.entity';
import { Repository } from 'typeorm';
import { SolicitudesAmistadService } from 'src/users/services/solicitudesAmistad.service';
import { UsersService } from 'src/users/services/users.service';


@Injectable()
export class PrivateChatsService {
    constructor(

        @Inject(forwardRef(() => SolicitudesAmistadService))
        private readonly solicitudAmistadServices: SolicitudesAmistadService,

        @Inject(forwardRef(() => UsersService))
        private readonly usersServices: UsersService,

        @InjectRepository(ChatPrivado)
        private readonly privateChatsRepository: Repository<ChatPrivado>

    ) { }

    async create(amistadId: number): Promise<ChatPrivado> {
        try {
            const solicitud = await this.solicitudAmistadServices.findOneReq(amistadId);

            if (!solicitud) {
                throw new HttpException(
                    `SolicitudAmistad con ID ${amistadId} no encontrada.`,
                    HttpStatus.NOT_FOUND,
                );
            }

            const newChat = this.privateChatsRepository.create({
                amistad: solicitud
            });

            return await this.privateChatsRepository.save(newChat);
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllUserChats(userId: number) {
        const friendships = await this.usersServices.findAllFriends(userId);

        const friendShipsIds = friendships.map((friendship) => (friendship.solicitudId.id))

        const privateChats = await this.privateChatsRepository
            .createQueryBuilder('privateChat')
            .leftJoinAndSelect('privateChat.amistad', 'amistad')
            .where('privateChat.amistad in (:...friendShipsIds)', { friendShipsIds })
            .getMany()

        const chatsList = friendships.flatMap((friendship) => {
            return privateChats
                .filter((chat) => chat.amistad.id === friendship.solicitudId.id)
                .map((chat) => ({
                    id: chat.id,
                    createAt: chat.createAt,
                    friend: friendship.user,
                }))
        })

        return chatsList
    }

    async findOne(id: number): Promise<ChatPrivado> {
        try {
            const chat = await this.privateChatsRepository.findOne({
                where: { id },
                relations: ['amistad']
            });

            if (!chat) {
                throw new HttpException(
                    `ChatPrivado con ID ${id} no encontrado.`,
                    HttpStatus.NOT_FOUND
                )
            }

            return chat
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const chat = await this.findOne(id)

            if (!chat) {
                throw new HttpException(
                    `ChatPrivado con ID ${id} no encontrado.`,
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.privateChatsRepository.remove(chat);
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
