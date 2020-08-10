import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BeforeInsert, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { LenguagesEntity } from "./lenguage.entity";


@Entity('books')
export class BookEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id_book: number;

    @Column({type: 'text', nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'text', nullable: false})
    handle: string;

    @Column({type: 'text', nullable: false})
    author1: string;

    @Column({type: 'text', nullable: true})
    author2: string;

    @Column({type: 'varchar', nullable: true})
    omr: string;

    @Column({type: 'text', nullable: false})
    editorial: string;

    @Column({type: 'varchar', nullable: false})
    isbn: string;

    @Column({type: 'varchar', nullable: true})
    collection: string;

    @Column({type: 'varchar', nullable: true})
    edition: string;

    @Column({type: 'int', nullable: false})
    quantity: number;

    @Column({type: 'text', nullable: true})
    printed_place: string;

    @Column({type: 'text', nullable: true})
    printed_year: number;

    @Column({type: 'float', nullable: true})
    cost: number;

    @Column({type: 'boolean', nullable: false})
    can_borrow: boolean;

    @Column({type: 'text', nullable: true})
    notes: string;
    
    @Column({type: 'boolean', nullable: false, default: true})
    status: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
    

    @ManyToOne(type => LenguagesEntity, {
        eager: true
    })
    @JoinColumn({name: 'id_lenguage'})
    lenguage: LenguagesEntity;

    @ManyToOne(type => CategoryEntity, {
        eager: true
    })
    @JoinColumn({name: 'id_category'})
    category: CategoryEntity;

}