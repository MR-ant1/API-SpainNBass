
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Latest } from "./Latest"
import { Post } from "./Post"
import { Comment } from "./Comment"


@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "nickname" })
    nickname!: string

    @Column({ name: "fav_subgenre", enum: ["RaggaJungle", "Club dnb", "Liquid dnb", "NeuroFunk", "Rollers", "Jump Up"],
    default: "'Club dnb'"})
    favSubgenre!: string

    @Column({ name: "preference", enum: ["dnb Lover", "DJ", "Producer", "DJ/Producer"],
    default: "'dnb Lover'"})
    preference!: string

    @Column({ name: "turntable" })
    turntable!: string

    @Column({ name: "email"})
    email!: string

    @Column({ name: "password_hash", select: false })
    password!: string

    @Column({ name: "role", select: false })
    role!: string

    @Column({ name: "created_at", select: true })
    createdAt!: Date

    @Column({ name: "updated_at", select: true })
    updatedAt!: Date

    @OneToMany(() => Latest, (latests) => latests.user)
    latests!: Latest

    @OneToMany(() => Comment, (comments) => comments.user)
    comments!: Comment

    @OneToMany(() => Post, (posts) => posts.owner)
    posts!: Post

    @ManyToMany(() => Post)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        }
    })
    likes!: User[]
}
