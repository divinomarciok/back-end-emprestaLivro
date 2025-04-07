import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Livro } from "../models/livro";
import { Pessoa } from "../models/pessoa";

@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Livro, (livro) => livro.emprestimos)
  livro!: Livro;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.emprestimos)
  pessoa!: Pessoa;

  @CreateDateColumn()
  data_emprestimo!: Date;

  @Column({ type: 'timestamp', nullable: true })
  data_devolucao!: Date | null;
}
