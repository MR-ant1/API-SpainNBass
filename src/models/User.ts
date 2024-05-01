
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
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

    @Column({ name: "password_hash", select: false })
    password!: string

    @Column({ name: "role", select: false })
    role!: string

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
    likes?: User[]
}