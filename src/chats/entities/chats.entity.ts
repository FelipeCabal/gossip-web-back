import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { InvitacionesGrupos } from "./invitaciones.entity";
import { SolicitudAmistad } from "src/users/entities/solicitud.entity";

@Entity('chatsPrivados')
export class ChatPrivado {
    @PrimaryGeneratedColumn()
    id: string

    @OneToOne(() => SolicitudAmistad)
    @JoinColumn()
    amistad: SolicitudAmistad

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date
}

@Entity('grupos')
export class Grupos {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    imagen: string

    @OneToMany(() => InvitacionesGrupos, (invitacionesGrupos) => invitacionesGrupos.grupo)
    user: InvitacionesGrupos[]
}

@Entity('comunidades')
export class Comunidades {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    imagen: string

    @ManyToMany(() => User, (user) => user.comunidades)
    user: User[]
}
