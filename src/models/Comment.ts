
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

    @Column({ name: "created_at", select: true })
    createdAt!: Date

    @Column({ name: "updated_at", select: true })
    updatedAt!: Date

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_id' })
    post!: Post
}