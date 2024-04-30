
import { BaseEntity, Column, Entity,   OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Latest } from "./Latest"
import { Post } from "./Post"
import { Comment } from "./Comment"


@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "nickname" })
    nickname!: string

    @Column({ name: "fav_subgenre" })
    favSubgenre!: string

    @Column({ name: "preference" })
    preference!: string

    @Column({ name: "turntable" })
    turntable!: string

    @Column({ name: "email" })
    email!: string

    @Column({ name: "password_hash", select:false })
    password!: string

    @Column({ name: "role", select:false })
    role!: string

    @OneToMany(() => Latest, (latest) => latest.user)
    latests!: Latest
    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Latest
    @OneToMany(() => Post, (post) => post.owner)
    posts!: Post

}