import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

@Entity('chatsPrivados')
export class ChatPrivado {
    @PrimaryGeneratedColumn()
    id: string
}

@Entity('grupos')
export class Grupos {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    descripcion: string
}

@Entity('comunidades')
export class Comunidades {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    descripcion: string
}
