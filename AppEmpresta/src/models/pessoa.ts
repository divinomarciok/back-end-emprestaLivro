import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Emprestimo } from "../models/emprestimo";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  matricula!: string;

  @Column()
  email!: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.pessoa)
  emprestimos!: Emprestimo[];
}
