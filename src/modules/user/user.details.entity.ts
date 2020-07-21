import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users_details')
export class UserDetailsEntity extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: "50", nullable: true})
    enrollment: string;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false, name: 'first_name'})
    firstName: string;

    @Column({type: 'varchar', nullable: true, name: 'second_name'})
    secondName: string;

}