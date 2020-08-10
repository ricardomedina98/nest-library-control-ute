import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";
import { UserDetailsEntity } from "./user.details.entity";
import * as bcrypt from 'bcryptjs';
import { UserStatus } from "./user-status.enum";
import { RoleEntity } from "../role/entities/role.entity";


@Entity('users')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', nullable: false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', default: UserStatus.ACTIVE, length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt?: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt?: Date;

    @OneToOne(type => UserDetailsEntity, {
        cascade: true, 
        nullable: false, 
        eager: true,
    })
    @JoinColumn({name: 'id_details'})
    details: UserDetailsEntity;

    @ManyToOne(type => RoleEntity,{
        nullable: false,
        eager: true
    })
    @JoinColumn({name: 'id_role'})
    role: RoleEntity

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}