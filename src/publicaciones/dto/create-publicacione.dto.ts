import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreatePublicacionesDto {
    @IsString()
    description: string

    @IsString()
    @IsOptional()
    imagen?: string

    @IsBoolean()
    esAnonimo?: boolean
}
