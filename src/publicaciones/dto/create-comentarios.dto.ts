import { IsString } from "class-validator";

export class CreateComentariosDto {

    @IsString()
    comentario: string
}