import { IsOptional, IsString } from "class-validator"

export class updateGruposDto {
    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    descripcion?: string

}