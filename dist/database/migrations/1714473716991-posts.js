"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts1714473716991 = void 0;
const typeorm_1 = require("typeorm");
class Posts1714473716991 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("posts");
        });
    }
}
exports.Posts1714473716991 = Posts1714473716991;
