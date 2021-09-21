import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
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
        return await this.occasionRepo.save(occasion);
    }

    @Put(':occasionId')
    async update(@Body() body: Occasion, @Param('occasionId') occasionId: string): Promise<Occasion> {
        await this.occasionRepo.findOneOrFail({
            where: { id: +occasionId }
        })
            .then(async () => await this.occasionRepo.update(+occasionId, body))
            .catch(() => { throw new HttpException('Esta ocasião não existe', HttpStatus.PRECONDITION_FAILED) });
        return await this.occasionRepo.findOne(+occasionId);
    }

    @Get()
    async index(): Promise<Occasion[]> {
        return await this.occasionRepo.find();
    }

}
