import { endereco } from "./endereco";

export interface Imovel {
id: number,
nome: string,
tipo: string[],
valor: number,
condominio: number,
quartos: number,
banheiros: number,
mobiliado: boolean,
area: number,
venda: boolean,
aluguel: boolean,
dataAnuncio: string,
endereco: endereco,
proprietarioId: number,
foto: string
}