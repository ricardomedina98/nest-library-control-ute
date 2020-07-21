import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from "typeorm";
import { UserStatus } from "../user/user-status.enum";
import { UserEntity } from "../user/user.entity";

@Entity('roles')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_role: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'varchar', default: UserStatus.ACTIVE, length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(type => UserEntity, user => user.role)
    @JoinColumn()
    users: UserEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async toUppercase() {
        this.name = this.name.toUpperCase();
    }
}