import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    mensaje: string;    // El contenido del mensaje

    @IsString()
    @IsNotEmpty()
    chatId: string;     // ID del chat (privado, grupal, comunidad)

    @IsString()
    @IsNotEmpty()
    chatType: string;   // Tipo de chat: 'private', 'group', 'community'

    @IsNumber()
    @IsNotEmpty()
    usuarioId: number; // Asegúrate de que esta propiedad esté aquí
}
