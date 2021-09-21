import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/User';
import { Repository } from 'typeorm';

@Controller('users')
export class UserController {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    @Post()
    async store(@Body() body: User): Promise<User> {
        const user = this.userRepo.create(body);
        return await this.userRepo.save(user);
    }

    @Post('various')
    async storeVarious(@Body() body: User[]): Promise<User[]> {
        const users = [];
        body.forEach(user => {
            users.push(this.userRepo.create(user));
        });
        return await this.userRepo.save(users);
    }

    @Get()
    async index(): Promise<User[]> {
        return this.userRepo.find();
    }

}
