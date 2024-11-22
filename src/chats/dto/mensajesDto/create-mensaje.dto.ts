import { IsNotEmpty, IsString } from "class-validator";

export class createMensajeDto {
    @IsString()
    @IsNotEmpty()
    chatId: string;

    @IsString()
    @IsNotEmpty()
    chatType: string; // "private", "group", "community"

    @IsString()
    mensaje: string
}