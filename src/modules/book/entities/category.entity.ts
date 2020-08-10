import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { BookEntity } from "./book.entity";


@Entity('book_categories')
export class CategoryEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id_category: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(type => BookEntity, book => book.category)
    @JoinColumn()
    books: BookEntity[];


}