"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
const typeorm_1 = require("typeorm");
const livro_1 = require("../models/livro");
const pessoa_1 = require("../models/pessoa");
let Emprestimo = class Emprestimo {
};
exports.Emprestimo = Emprestimo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Emprestimo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => livro_1.Livro, (livro) => livro.emprestimos),
    __metadata("design:type", livro_1.Livro)
], Emprestimo.prototype, "livro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_1.Pessoa, (pessoa) => pessoa.emprestimos),
    __metadata("design:type", pessoa_1.Pessoa)
], Emprestimo.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Emprestimo.prototype, "data_emprestimo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Emprestimo.prototype, "data_devolucao", void 0);
exports.Emprestimo = Emprestimo = __decorate([
    (0, typeorm_1.Entity)()
], Emprestimo);
