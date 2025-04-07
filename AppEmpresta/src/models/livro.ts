import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Emprestimo } from "../models/emprestimo";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  autor!: string;

  @Column()
  categoria!: string;

  @Column({ default: 'disponivel' })
  status!: 'disponivel' | 'emprestado';

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
  emprestimos!: Emprestimo[];
}
