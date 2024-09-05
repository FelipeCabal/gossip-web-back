import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
