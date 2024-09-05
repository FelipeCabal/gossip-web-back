import { IsNotEmpty, IsString } from "class-validator"

export class updateComunidadesDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string

    @IsString()
    descripcion?: string
}