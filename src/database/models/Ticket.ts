import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Events } from "./Events";
import { User } from "./User";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.tickets)
    user_id: User;

    @ManyToOne(() => Events, events => events.tickets)
    event_id: Events;

    @Column()
    chair: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}
