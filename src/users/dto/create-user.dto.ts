import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsDate()
    @IsNotEmpty()
    fechaNto: Date

    @IsString()
    @IsNotEmpty()
    sexo: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsNotEmpty()
    pais: string
}

