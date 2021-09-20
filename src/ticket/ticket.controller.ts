import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Occasion } from 'src/database/models/Occasion';
import { Ticket } from 'src/database/models/Ticket';
import { Repository } from 'typeorm';


@Controller('tickets')
export class TicketController {

    constructor(
        @InjectRepository(Ticket)
        private ticketRepo: Repository<Ticket>,
        @InjectRepository(Occasion)
        private occasionRepo: Repository<Occasion>
    ) { }

    @Post()
    async store(@Body() body: Ticket): Promise<Ticket> {
        await this.ticketRepo.count({
            where: { occasion_id: body.occasion_id }
        }).then(async count => {
            await this.occasionRepo.findOne({
                where: { id: body.occasion_id },
                select: ['max_quantity']
            }).then(occasion => {
                if (count >= occasion.max_quantity) throw new HttpException('Já lotou, sinto muito 8(', HttpStatus.PRECONDITION_FAILED);
            });
        });
        await this.ticketRepo.findOne({
            where: {
                occasion_id: body.occasion_id,
                chair: body.chair
            },
        }).then(exists => {
            if (exists) throw new HttpException('Cadeira já ocupada 8(', HttpStatus.PRECONDITION_FAILED);
        });
        const ticket = this.ticketRepo.create(body);
        return this.ticketRepo.save(ticket);
    }

    @Get()
    async index(): Promise<Ticket[]> {
        return this.ticketRepo.find();
    }

    @Get(':occasionId')
    async indexByEventsId(@Param('occasionId') occasionId: string): Promise<Ticket[]> {
        return this.ticketRepo.find({
            where: {
                occasion_id: parseInt(occasionId),
            },
            relations: ['user_id', 'occasion_id'],
            order: { chair: "ASC" }
        });
    }

}