import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ReviewsEntity } from './reviews.entity';

@Entity({ name: "books", schema: "public" })
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'int' })
    year: number;

    @Column('simple-array')
    genre: string[];

    @Column({ type: 'varchar', nullable: true })
    coverImage?: string;

    @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
    rating?: number;

    @Column({ type: 'boolean' })
    isFavorite: boolean;

    @ManyToOne(() => UserEntity, user => user.books)
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => ReviewsEntity, review => review.book)
    reviews: ReviewsEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}