import { IsBoolean, IsString } from "class-validator"

export class CreatePublicacionesDto {
    @IsString()
    description: string

    @IsString()
    image?: string

    @IsBoolean()
    esAnonimo?: boolean
}
