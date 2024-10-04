import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Grupos } from "./chats.entity";
import { Status } from "src/config/enums/status.enum";

@Entity('invitacionesGrupos')
export class InvitacionesGrupos {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.grupos)
    user: User

    @ManyToOne(() => Grupos, grupos => grupos.user)
    grupo: Grupos

    @Column()
    status: Status
}