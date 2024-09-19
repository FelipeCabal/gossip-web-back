import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => User, (user) => user.publicaciiones)
    user: User[]
}
