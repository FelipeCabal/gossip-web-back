import { IsString } from "class-validator";

export class createMensajeDto {

    @IsString()
    mensaje: string
}