export interface Category {
  secureId: string;
  name: string;
  group:
    | 'Renda'
    | 'Gastos Essenciais'
    | 'Estilo de Vida'
    | 'Empréstimos'
    | 'Não Classificado';
}
