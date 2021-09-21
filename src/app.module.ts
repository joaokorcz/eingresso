import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/User';
import { Occasion } from './database/models/Occasion';
import { Ticket } from './database/models/Ticket';
import { UserController } from './user/user.controller';
import { OccasionController } from './occasion/occasion.controller';
import { TicketController } from './ticket/ticket.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.TYPEORM_CONNECTION as any,
            host: process.env.TYPEORM_HOST,
            port: +process.env.TYPEORM_PORT,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [User, Occasion, Ticket]
        }),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Occasion]),
        TypeOrmModule.forFeature([Ticket])
    ],
    controllers: [UserController, OccasionController, TicketController],
    providers: [],
})
export class AppModule { }
