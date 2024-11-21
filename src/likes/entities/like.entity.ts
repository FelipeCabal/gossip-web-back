import { Publicaciones } from "src/publicaciones/entities/publicaciones.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('likes')
@Unique(['user', 'publicaciones'])
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: 'date' })
    fecha: Date

    @Column({ type: 'time', default: () => 'CURRENT_TIME' })
    hora: string

    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Publicaciones, (publicaciones) => publicaciones.likes, { onDelete: 'CASCADE' })
    publicaciones: Publicaciones
}
