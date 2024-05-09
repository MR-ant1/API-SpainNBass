import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Posts1714473716991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'posts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "250",
                        isNullable: true
                    },
                    {
                        name: "description",
                        type: "text",
                        length: "1000"
                    },
                    {
                        name: "topic",
                        type: "enum",
                        enum: ["RaggaJungle", "Club dnb", "Liquid dnb", "NeuroFunk", "Rollers", "Jump Up", "memes"],
                        isNullable: true
                    },
                    {
                        name: "pic_url",
                        type: "varchar",
                        length: "250",
                        isNullable: true
                    },
                    {
                        name: "owner_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["owner_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts")
    }

}
