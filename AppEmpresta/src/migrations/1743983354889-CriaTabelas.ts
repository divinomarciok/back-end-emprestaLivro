import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1743983354889 implements MigrationInterface {
    name = 'CriaTabelas1743983354889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "matricula" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emprestimo" ("id" SERIAL NOT NULL, "data_emprestimo" TIMESTAMP NOT NULL DEFAULT now(), "data_devolucao" TIMESTAMP, "livroId" integer, "pessoaId" integer, CONSTRAINT "PK_d8f9a723b1f2fd57102a5c424f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livro" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "autor" character varying NOT NULL, "categoria" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'disponivel', CONSTRAINT "PK_5601163ea69da49108c4f7854cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emprestimo" ADD CONSTRAINT "FK_a2195eee1f149588803685e5857" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_a2195eee1f149588803685e5857"`);
        await queryRunner.query(`ALTER TABLE "emprestimo" DROP CONSTRAINT "FK_6a87b564046e0c3c735f5d21d98"`);
        await queryRunner.query(`DROP TABLE "livro"`);
        await queryRunner.query(`DROP TABLE "emprestimo"`);
        await queryRunner.query(`DROP TABLE "pessoa"`);
    }

}
