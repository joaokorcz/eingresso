import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Occasion } from "./Occasion";
import { User } from "./User";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: 'user_id' })
    @Column('number')
    user_id: User;

    @ManyToOne(() => Occasion, occasion => occasion.tickets)
    @JoinColumn({ name: 'occasion_id' })
    @Column('number')
    occasion_id: Occasion;

    @Column()
    chair: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}
