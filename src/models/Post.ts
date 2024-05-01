

import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"


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

    @ManyToOne(() => User, (owner) => owner.posts)
    @JoinColumn({ name: 'owner_id' })
    owner!: User

    @OneToMany(() => Comment, (comments) => comments.post)
    comments!: Comment

    @ManyToMany(() => User)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    likes?: Post[]
}
