import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createComunidadDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsString()
    @IsOptional()
    imagen?: string

}