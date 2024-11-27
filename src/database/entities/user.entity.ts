import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { BookEntity } from "./book.entity";
import { ReviewsEntity } from "./reviews.entity";


@Entity({name: "user", schema: "public"})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => BookEntity, book => book.user)
    books: BookEntity[];

    @OneToMany(() => ReviewsEntity, review => review.user)
    review: ReviewsEntity[];
 
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}