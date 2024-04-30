

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"


@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "title" })
    title!: string

    @Column({ name: "description" })
    description!: string

    @Column({ name: "topic" })
    topic!: string
    
    @Column({ name: "pic_url" })
    picUrl!: string

    @ManyToOne(() => User, (owner) => owner.posts)
    @JoinColumn({ name: 'owner_id' })
    owner!: User
}
