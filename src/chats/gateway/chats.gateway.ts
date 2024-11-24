import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { MessagesService } from '../services/mensajes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from '../dto/mensajesDto/create-mensaje.dto';

@WebSocketGateway({
    cors: {
        origin: '*', // Cambiar en producción para permitir solo ciertos orígenes
        credentials: true,
    },
})
export class MessagesGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messagesService: MessagesService) { }

    // Inicializa el servidor de WebSockets
    afterInit(server: Server) {
        this.server = server;
        console.log('WebSocket Server initialized');
    }

    @UseGuards(AuthGuard)
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @MessageBody() createMessageDto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        const user = client.handshake.headers['user']; // Obtén el usuario del contexto (puede requerir ajuste en AuthGuard)

        // Agregar usuarioId al mensaje
        const messageData = {
            ...createMessageDto,
            usuarioId: user?.id, // Ajustar según tu lógica del usuario
        };

        // Guardar mensaje en la base de datos
        const message = await this.messagesService.createMessage(messageData);

        // Emitir mensaje al room correspondiente (chatType + chatId)
        const roomName = `${createMessageDto.chatType}:${createMessageDto.chatId}`;
        this.server.to(roomName).emit('messageReceived', message);

        console.log('Mensaje enviado:', message);
    }

    @UseGuards(AuthGuard)
    @SubscribeMessage('joinChat')
    handleJoinChat(
        @MessageBody() data: { chatType: string; chatId: string },
        @ConnectedSocket() client: Socket,
    ): void {
        const { chatType, chatId } = data;

        // Crear el nombre del room
        const roomName = `${chatType}:${chatId}`;

        // Unir al usuario al room
        client.join(roomName);
        console.log(`Usuario ${client.id} se unió al chat ${roomName}`);
    }
}
