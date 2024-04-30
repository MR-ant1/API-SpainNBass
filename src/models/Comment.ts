


import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"


@Entity('comment')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "comment" })
    description!: string

    @Column({ name: "url" })
    topic!: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user!: User
}