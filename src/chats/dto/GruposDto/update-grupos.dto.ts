import { IsNotEmpty, IsString } from "class-validator"

export class updateGruposDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string

    @IsString()
    descripcion?: string

}