import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1714418032255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name:'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nickname",
                        type: "varchar",
                        length: "40",
                        isUnique: true
                    },
                    {
                        name: "fav_subgenre",
                        type: "varchar",
                        length: "40",
                        isNullable: true
                    },
                    {
                        name: "preference",
                        type: "enum",
                        enum: ["dnbLover", "dj", "producer", "dj/producer"],
                        default: "'dnbLover'"
                    },
                    {
                        name: "turntable",
                        type: "varchar",
                        length: "40",
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
