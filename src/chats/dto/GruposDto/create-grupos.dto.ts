import { IsNotEmpty, IsString } from "class-validator"

export class createGrupoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    descripcion: string

}