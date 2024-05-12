
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"


@Entity('likes')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "created_at" })
    createdAt!: Date

    @Column({ name: "updated_at" })
    updatedAt!: Date

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @ManyToOne(() => Post, (post) => post.likes)
    @JoinColumn({ name: 'post_id' })
    post!: Post
}