import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => User, (user) => user.grupos)
    user: User[]
}

@Entity('comunidades')
export class Comunidades {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @ManyToMany(() => User, (user) => user.comunidades)
    user: User[]
}
