import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsDate()
    @IsString()
    @IsNotEmpty()
    fechaNto: string

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

