import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('publicaciones')
export class Publicaciones {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    description: string

    @Column()
    image: string

    @Column({ default: false })
    esAnonimo: boolean

    @ManyToOne(() => User, (user) => user.publicaciones)
    user: User
}
