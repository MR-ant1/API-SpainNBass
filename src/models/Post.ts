

import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"
import { Like } from "./Like"


@Entity('posts')
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

    @Column({ name: "created_at", select: true })
    createdAt!: Date

    @Column({ name: "updated_at", select: true })
    updatedAt!: Date

    @ManyToOne(() => User, (owner) => owner.posts)
    @JoinColumn({ name: 'owner_id' })
    owner!: User

    @OneToMany(() => Comment, (comments) => comments.post)
    comments!: Comment

    @OneToMany(() => Like, (likes) => likes.post)
    likes!: Like

    // @ManyToMany(() => User)
    // @JoinTable({
    //     name: 'likes',
    //     joinColumn: {
    //         name: 'post_id',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'user_id',
    //         referencedColumnName: 'id'
    //     }
    // })
    // likes!: User[]
}
