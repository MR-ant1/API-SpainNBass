
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity('latests')
export class Latest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "title" })
    title!: string

    @Column({ name: "description" })
    description!: string

    @Column({ name: "pic_url" })
    picUrl!: string

    @Column({ name: "created_at", select: true })
    createdAt!: Date

    @Column({ name: "updated_at", select: true })
    updatedAt!: Date

    @ManyToOne(() => User, (user) => user.latests)
    @JoinColumn({ name: 'user_id' })
    user!: User
}
