import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class Occasion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    max_quantity: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    start_time: Date;

    @CreateDateColumn({ type: 'timestamp' })
    end_time: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(() => Ticket, ticket => ticket.occasion_id)
    tickets: Ticket[];

}
