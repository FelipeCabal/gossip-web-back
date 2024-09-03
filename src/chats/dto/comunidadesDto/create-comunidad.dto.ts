import { IsNotEmpty, IsString } from "class-validator"

export class createComunidadDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    descripcion: string

}