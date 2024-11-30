import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensajes } from '../entities/mensajes.schema';
import { UsersService } from 'src/users/services/users.service';
import { CreateMessageDto } from '../dto/mensajesDto/create-mensaje.dto';
import { PrivateChatsService } from './private-chats.service';
import { Role } from 'src/config/enums/roles.enum';
import { GroupChatsService } from './gruop-chats.service';
import { ComunidadesService } from './comunity-chats.service';
import { throwError } from 'rxjs';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Mensajes.name) private mensajeModel: Model<Mensajes>,
        private readonly usersService: UsersService, // Inyectamos el servicio de usuarios
        private readonly privateChatsService: PrivateChatsService,
        private readonly groupChatService: GroupChatsService,
        private readonly comunidadesService: ComunidadesService
    ) { }

    // Crear un nuevo mensaje y asociarlo al usuario
    async createMessage(createMessageDto: CreateMessageDto): Promise<Partial<Mensajes>> {
        const { message, chatId, chatType, usuarioId } = createMessageDto;

        // Verificar si el usuario existe
        const user = await this.usersService.findOneUser(usuarioId); // Usamos el usuarioId que llega en el request
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        // Crear el mensaje
        const newMessage = await new this.mensajeModel({
            usuarioId,
            message,
            chatId,
            chatType,
        }).save();

        const { _id, createdAt, updatedAt } = newMessage.toObject();
        return {
            id: _id.toString(), usuarioId, message, chatId, chatType, createdAt, updatedAt
        };
    }

    // Obtener mensajes por chatId y chatType
    async findMessagesByChatId(chatId: number, chatType: string): Promise<Partial<Mensajes>[]> {
        const messages = await this.mensajeModel
            .find({ chatId, chatType })
            .lean()
            .exec();

        if (!messages.length) {
            throw new NotFoundException('No messages found for this chat.');
        }

        return messages.map(({ _id, usuarioId, message, chatId, chatType, createdAt, updatedAt }) => ({
            id: _id.toString(),
            usuarioId,
            message,
            chatId,
            chatType,
            createdAt,
            updatedAt,
        }));
    }

    async ClearChat(chatId: number, userId: number): Promise<{ deletedCount: number }> {

        const chat = await this.privateChatsService.findOne(chatId);
        const group = await this.groupChatService.findGroupById(chatId);
        const comunidad = await this.comunidadesService.findCommunityById(chatId);

        if (!chat && !group && !comunidad) {
            throw new HttpException("Chat not found", HttpStatus.NOT_FOUND);
        }

        let chatType: string;
        if (chat) chatType = 'private';
        else if (group) chatType = 'group';
        else if (comunidad) chatType = 'community';
        else throw new HttpException("Chat not found", HttpStatus.NOT_FOUND);


        if (chatType === 'private') {
            if (chat.amistad.userEnvia.id !== userId && chat.amistad.userRecibe.id !== userId) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            const deletedMessages = await this.mensajeModel.deleteMany({ chatId });

            return { deletedCount: deletedMessages.deletedCount };
        }

        if (chatType === 'group') {
            const isMember = group.miembros.some((member) => member.id === userId);
            if (!isMember) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            }

            const deletedMessages = await this.mensajeModel.deleteMany({ chatId });

            return { deletedCount: deletedMessages.deletedCount }
        }

        if (chatType === 'community') {
            const isOwner = comunidad.miembros.some((member) => member.rol === Role.Owner && member.id === userId);
            const isAdmin = comunidad.miembros.some((member) => member.rol === Role.Admin && member.id === userId);

            if (!isOwner && !isAdmin) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            const deletedMessages = await this.mensajeModel.deleteMany({ chatId });

            return { deletedCount: deletedMessages.deletedCount }
        }
    }
}
