import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";


@Entity({ name: "reviews", schema: "public" })
export class ReviewsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(() => UserEntity, (user) => user.review, { eager: true })
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => BookEntity, book => book.user, { eager: true })
    @JoinColumn()
    book: BookEntity[];

    @Column()
    rating: number;

    @Column()
    comments: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}