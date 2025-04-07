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
exports.CriaTabelas1743983354889 = void 0;
class CriaTabelas1743983354889 {
    constructor() {
        this.name = 'CriaTabelas1743983354889';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "matricula" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "emprestimo" ("id" SERIAL NOT NULL, "data_emprestimo" TIMESTAMP NOT NULL DEFAULT now(), "data_devolucao" TIMESTAMP, "livroId" integer, "pessoaId" integer, CONSTRAINT "PK_d8f9a723b1f2fd57102a5c424f8" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "livro" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "autor" character varying NOT NULL, "categoria" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'disponivel', CONSTRAINT "PK_5601163ea69da49108c4f7854cf" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_a2195eee1f149588803685e5857" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_a2195eee1f149588803685e5857"`);
            yield queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98"`);
            yield queryRunner.query(`DROP TABLE "livro"`);
            yield queryRunner.query(`DROP TABLE "emprestimo"`);
            yield queryRunner.query(`DROP TABLE "pessoa"`);
        });
    }
}
exports.CriaTabelas1743983354889 = CriaTabelas1743983354889;
