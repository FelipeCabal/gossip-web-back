import { Exclude } from "class-transformer";
import { Comunidades, Grupos } from "src/chats/entities/chats.entity";
import { Publicaciones } from "src/publicaciones/entities/publicaciones.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    email: string

    @Column({ type: 'date' })
    fechaNto: Date

    @Column()
    sexo: string

    @Exclude()
    @Column({ unique: true })
    password: string

    @Column()
    pais: string

    @OneToMany(() => Publicaciones, (publicaciones) => publicaciones.user)
    publicaciones: Publicaciones[]

    @ManyToMany(() => Comunidades, (comunidades) => comunidades.user)
    @JoinTable()
    comunidades: Comunidades[]

    @ManyToMany(() => Grupos, (grupos) => grupos.user)
    @JoinTable()
    grupos: Grupos[]
}
