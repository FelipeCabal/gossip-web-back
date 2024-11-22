import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private activeUsers = new Map<string, Socket>();

    afterInit(server: Server) {
        console.log('Gateway inicializado');
    }

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        const chatId = client.handshake.query.chatId as string;
        const chatType = client.handshake.query.chatType as string; // private, group, community

        if (userId && chatId && chatType) {
            const roomName = `${chatType}-${chatId}`;
            client.join(roomName); // Une al cliente a la sala específica
            console.log(`Usuario ${userId} conectado a la sala ${roomName}`);
        } else {
            console.error('Conexión rechazada: falta userId, chatId o chatType');
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        const userId = [...this.activeUsers.entries()].find(
            ([, socket]) => socket.id === client.id,
        )?.[0];

        if (userId) {
            this.activeUsers.delete(userId);
            console.log(`Usuario ${userId} desconectado`);
        }
    }

    @SubscribeMessage('sendMessage')
    handleSendMessage(
        @MessageBody()
        data: { chatId: string; chatType: string; senderId: string; content: string },
        @ConnectedSocket() client: Socket,
    ) {
        const roomName = `${data.chatType}-${data.chatId}`;
        console.log(`Mensaje recibido para la sala ${roomName}:`, data);

        this.server.to(roomName).emit('receiveMessage', {
            ...data,
            timestamp: new Date(),
        });
    }
}
