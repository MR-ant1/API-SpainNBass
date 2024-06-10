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
exports.Users1714418032255 = void 0;
const typeorm_1 = require("typeorm");
class Users1714418032255 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'users',
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
                        type: "enum",
                        enum: ["RaggaJungle", "Club dnb", "Liquid dnb", "NeuroFunk", "Rollers", "Jump Up"],
                        default: "'Club dnb'"
                    },
                    {
                        name: "preference",
                        type: "enum",
                        enum: ["dnb Lover", "DJ", "Producer", "DJ/Producer"],
                        default: "'dnb Lover'"
                        //Incluimos dobles comillas porque typeorm lo exige para incluir el default en la migración
                    },
                    {
                        name: "turntable",
                        type: "varchar",
                        length: "250",
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
                        name: "role",
                        type: "enum",
                        enum: ["user", "admin", "super_admin"],
                        default: "'user'"
                        //ocurre lo mismo que en el otro enum
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
                ]
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("users");
        });
    }
}
exports.Users1714418032255 = Users1714418032255;
