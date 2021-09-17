import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventTable1631883441646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'event',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'event_name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'max_quantity',
                    type: 'int'
                },
                {
                    name: 'event_start_time',
                    type: 'timestamp'
                },
                {
                    name: 'event_end_time',
                    type: 'timestamp'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('event');
    }

}
