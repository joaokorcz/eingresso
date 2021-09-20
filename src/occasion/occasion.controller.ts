import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Occasion } from 'src/database/models/Occasion';
import { Repository } from 'typeorm';


@Controller('occasions')
export class OccasionController {

    constructor(
        @InjectRepository(Occasion)
        private occasionRepo: Repository<Occasion>,
    ) { }

    @Post()
    async store(@Body() body: Occasion): Promise<Occasion> {
        const occasion = this.occasionRepo.create(body);
        return this.occasionRepo.save(occasion);
    }

    @Get()
    async index(): Promise<Occasion[]> {
        return this.occasionRepo.find();
    }
    
}
