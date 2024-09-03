import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
