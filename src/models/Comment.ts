


import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"


@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "comment" })
    description!: string

    @Column({ name: "url" })
    topic!: string

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_id' })
    post!: User
}