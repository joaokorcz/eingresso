import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class Events {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event_name: string;

    @Column()
    description: string;

    @Column()
    max_quantity: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    event_start_time: Date;

    @CreateDateColumn({ type: 'timestamp' })
    event_end_time: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.event_id)
    tickets: Ticket[];

}
