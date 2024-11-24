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
    async createMessage(createMessageDto: CreateMessageDto): Promise<Mensajes> {
        const { mensaje, chatId, chatType, usuarioId } = createMessageDto;

        // Verificar si el usuario existe
        const user = await this.usersService.findOneUser(usuarioId); // Usamos el usuarioId que llega en el request
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        // Crear el mensaje
        const newMessage = new this.mensajeModel({
            usuarioId,
            mensaje,
            chatId,
            chatType,
        });

        // Guardar el mensaje en la base de datos
        return await newMessage.save();
    }

    // Obtener mensajes por chatId y chatType
    async findMessagesByChatId(chatId: string, chatType: string): Promise<Mensajes[]> {
        const messages = await this.mensajeModel
            .find({ chatId, chatType })
            .exec();

        if (!messages.length) {
            throw new NotFoundException('No messages found for this chat.');
        }

        return messages;
    }
}
