import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { InvitacionesGrupos } from "./invitaciones.entity";
import { SolicitudAmistad } from "src/users/entities/solicitud.entity";
import { MiembrosComunidades } from "./miembrosComunidad.entity";

@Entity('chatsPrivados')
export class ChatPrivado {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => SolicitudAmistad, (solicitud) => solicitud.chatPrivado, { onDelete: 'CASCADE' })
    @JoinColumn()
    amistad: SolicitudAmistad

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date
}

@Entity('grupos')
export class Grupos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ nullable: true })
    descripcion: string

    @Column({ nullable: true })
    imagen: string

    @ManyToMany(() => User, (user) => user.grupos, { cascade: true })
    @JoinTable()
    miembros: User[];

    @OneToMany(() => InvitacionesGrupos, (invitacion) => invitacion.grupo, { cascade: true })
    invitaciones: InvitacionesGrupos[]
}

@Entity('comunidades')
export class Comunidades {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ nullable: true })
    descripcion: string

    @Column({ nullable: true })
    imagen: string

    @OneToMany(() => MiembrosComunidades, (miembro) => miembro.comunidad, { cascade: true })
    miembros: MiembrosComunidades[];
}
