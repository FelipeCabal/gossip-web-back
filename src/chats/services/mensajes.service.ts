import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensajes } from '../entities/mensajes.schema';
import { UsersService } from 'src/users/services/users.service';
import { CreateMessageDto } from '../dto/mensajesDto/create-mensaje.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Mensajes.name) private mensajeModel: Model<Mensajes>,
        private readonly usersService: UsersService, // Inyectamos el servicio de usuarios
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
}
