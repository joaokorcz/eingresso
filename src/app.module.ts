import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/models/User';
import { UserController } from './user/user.controller';
import { EventController } from './event/event.controller';
import { TicketController } from './ticket/ticket.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            // @ts-ignore
            type: process.env.TYPEORM_CONNECTION,
            host: process.env.TYPEORM_HOST,
            port: parseInt(process.env.TYPEORM_PORT),
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [User]
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AppController, UserController, EventController, TicketController],
    providers: [AppService],
})
export class AppModule { }
