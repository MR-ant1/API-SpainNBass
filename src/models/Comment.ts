


import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"


@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "comment" })
    comment!: string

    @Column({ name: "url" })
    url!: string

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_id' })
    post!: Post
}