import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTicketTable1631883448394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ticket',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'int'
                },
                {
                    name: 'event_id',
                    type: 'int'
                },
                {
                    name: 'chair',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey(
            'ticket',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user'
            })
        );

        await queryRunner.createForeignKey(
            'ticket',
            new TableForeignKey({
                columnNames: ['event_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'event'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('ticket');
    }

}
